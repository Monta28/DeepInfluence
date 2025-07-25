const bcrypt = require('bcryptjs');
const prisma = require('../../services/database');
const JWTUtils = require('../../utils/jwt');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour l'authentification
 */
class AuthController {
  /**
   * Inscription d'un nouvel utilisateur
   */
  static async register(req, res) {
    try {
      const { 
        firstName, 
        lastName, 
        email, 
        password, 
        userType = 'user',
        phone,
        bio,
        location 
      } = req.body;

      // Validation des champs requis
      if (!firstName || !lastName || !email || !password) {
        return ApiResponse.badRequest(res, 'Tous les champs obligatoires doivent être remplis');
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ApiResponse.badRequest(res, 'Format d\'email invalide');
      }

      // Validation du mot de passe
      if (password.length < 8) {
        return ApiResponse.badRequest(res, 'Le mot de passe doit contenir au moins 8 caractères');
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return ApiResponse.badRequest(res, 'Un utilisateur avec cet email existe déjà');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
          phone,
          bio,
          location,
          coins: 100 // Coins de bienvenue
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
          coins: true,
          joinDate: true
        }
      });

      // Générer le token JWT
      const token = JWTUtils.generateToken({
        userId: user.id,
        email: user.email,
        userType: user.userType
      });

      return ApiResponse.created(res, {
        user,
        token
      }, 'Inscription réussie');

    } catch (error) {
      console.error('Register error:', error);
      return ApiResponse.error(res, 'Erreur lors de l\'inscription');
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation des champs requis
      if (!email || !password) {
        return ApiResponse.badRequest(res, 'Email et mot de passe requis');
      }

      // Trouver l'utilisateur
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          expert: true
        }
      });

      if (!user) {
        return ApiResponse.unauthorized(res, 'Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ApiResponse.unauthorized(res, 'Email ou mot de passe incorrect');
      }

      // Générer le token JWT
      const token = JWTUtils.generateToken({
        userId: user.id,
        email: user.email,
        userType: user.userType
      });

      // Préparer les données utilisateur (sans le mot de passe)
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        coins: user.coins,
        isVerified: user.isVerified,
        joinDate: user.joinDate,
        expert: user.expert
      };

      return ApiResponse.success(res, {
        user: userData,
        token
      }, 'Connexion réussie');

    } catch (error) {
      console.error('Login error:', error);
      return ApiResponse.error(res, 'Erreur lors de la connexion');
    }
  }

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  static async me(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          expert: true
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          bio: true,
          location: true,
          avatar: true,
          userType: true,
          isVerified: true,
          coins: true,
          sessionsCompleted: true,
          formationsFollowed: true,
          learningHours: true,
          expertsFollowed: true,
          joinDate: true,
          expert: true
        }
      });

      if (!user) {
        return ApiResponse.notFound(res, 'Utilisateur non trouvé');
      }

      return ApiResponse.success(res, user);

    } catch (error) {
      console.error('Me error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération du profil');
    }
  }

  /**
   * Déconnexion (côté client principalement)
   */
  static async logout(req, res) {
    try {
      // Dans une implémentation plus avancée, on pourrait blacklister le token
      return ApiResponse.success(res, null, 'Déconnexion réussie');
    } catch (error) {
      console.error('Logout error:', error);
      return ApiResponse.error(res, 'Erreur lors de la déconnexion');
    }
  }

  /**
   * Rafraîchir le token
   */
  static async refreshToken(req, res) {
    try {
      // Générer un nouveau token avec les mêmes informations
      const token = JWTUtils.generateToken({
        userId: req.user.id,
        email: req.user.email,
        userType: req.user.userType
      });

      return ApiResponse.success(res, { token }, 'Token rafraîchi');

    } catch (error) {
      console.error('Refresh token error:', error);
      return ApiResponse.error(res, 'Erreur lors du rafraîchissement du token');
    }
  }
}

module.exports = AuthController;

