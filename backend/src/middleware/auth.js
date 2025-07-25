const { PrismaClient } = require('@prisma/client');
const JWTUtils = require('../utils/jwt');
const ApiResponse = require('../utils/response');

const prisma = new PrismaClient();

/**
 * Middleware pour vérifier l'authentification
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Token manquant ou invalide');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = JWTUtils.verifyToken(token);
    
    // Vérifier que l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        userType: true,
        isVerified: true,
        coins: true
      }
    });

    if (!user) {
      return ApiResponse.unauthorized(res, 'Utilisateur non trouvé');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return ApiResponse.unauthorized(res, 'Token invalide');
    }
    
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token expiré');
    }
    
    return ApiResponse.error(res, 'Erreur d\'authentification');
  }
};

/**
 * Middleware pour vérifier que l'utilisateur est un expert
 */
const requireExpert = async (req, res, next) => {
  try {
    if (req.user.userType !== 'expert') {
      return ApiResponse.forbidden(res, 'Accès réservé aux experts');
    }
    
    // Récupérer les informations de l'expert
    const expert = await prisma.expert.findUnique({
      where: { userId: req.user.id }
    });
    
    if (!expert) {
      return ApiResponse.forbidden(res, 'Profil expert non trouvé');
    }
    
    req.expert = expert;
    next();
  } catch (error) {
    console.error('Expert middleware error:', error);
    return ApiResponse.error(res, 'Erreur de vérification expert');
  }
};

/**
 * Middleware optionnel pour l'authentification
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = JWTUtils.verifyToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        userType: true,
        isVerified: true,
        coins: true
      }
    });

    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    // En cas d'erreur, on continue sans utilisateur authentifié
    next();
  }
};

module.exports = {
  verifyToken,
  requireExpert,
  optionalAuth
};

