const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des experts
 */
class ExpertController {
  /**
   * Récupérer tous les experts
   */
  static async getAllExperts(req, res) {
    try {
      const { 
        category, 
        search, 
        isOnline, 
        verified, 
        sortBy = 'rating',
        order = 'desc',
        page = 1,
        limit = 20 
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Construire les filtres
      const where = {};
      
      if (category && category !== 'all') {
        where.category = category;
      }
      
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { specialty: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ];
      }
      
      if (isOnline !== undefined) {
        where.isOnline = isOnline === 'true';
      }
      
      if (verified !== undefined) {
        where.verified = verified === 'true';
      }

      // Construire l'ordre de tri
      const orderBy = {};
      orderBy[sortBy] = order;

      const [experts, total] = await Promise.all([
        prisma.expert.findMany({
          where,
          orderBy,
          skip,
          take: parseInt(limit),
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          }
        }),
        prisma.expert.count({ where })
      ]);

      // Formater les données
      const formattedExperts = experts.map(expert => ({
        id: expert.id,
        name: expert.name,
        specialty: expert.specialty,
        rating: expert.rating,
        reviews: expert.reviews,
        hourlyRate: expert.hourlyRate,
        pricePerMessage: expert.pricePerMessage,
        image: expert.image,
        isOnline: expert.isOnline,
        nextAvailable: expert.nextAvailable,
        tags: JSON.parse(expert.tags || '[]'),
        verified: expert.verified,
        category: expert.category,
        languages: JSON.parse(expert.languages || '[]'),
        responseTime: expert.responseTime,
        sessions: expert.sessions,
        followers: expert.followers,
        description: expert.description,
        user: expert.user
      }));

      return ApiResponse.success(res, {
        experts: formattedExperts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });

    } catch (error) {
      console.error('Get all experts error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des experts');
    }
  }

  /**
   * Récupérer un expert par ID
   */
  static async getExpertById(req, res) {
    try {
      const { id } = req.params;

      const expert = await prisma.expert.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              joinDate: true
            }
          },
          formations: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          },
          videos: {
            take: 5,
            orderBy: { publishedAt: 'desc' }
          },
          receivedReviews: {
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        }
      });

      if (!expert) {
        return ApiResponse.notFound(res, 'Expert non trouvé');
      }

      // Formater les données
      const formattedExpert = {
        id: expert.id,
        name: expert.name,
        specialty: expert.specialty,
        rating: expert.rating,
        reviews: expert.reviews,
        hourlyRate: expert.hourlyRate,
        pricePerMessage: expert.pricePerMessage,
        image: expert.image,
        isOnline: expert.isOnline,
        nextAvailable: expert.nextAvailable,
        tags: JSON.parse(expert.tags || '[]'),
        verified: expert.verified,
        category: expert.category,
        languages: JSON.parse(expert.languages || '[]'),
        responseTime: expert.responseTime,
        sessions: expert.sessions,
        followers: expert.followers,
        description: expert.description,
        user: expert.user,
        formations: expert.formations,
        videos: expert.videos,
        reviews: expert.receivedReviews
      };

      return ApiResponse.success(res, formattedExpert);

    } catch (error) {
      console.error('Get expert by ID error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération de l\'expert');
    }
  }

  /**
   * Créer un profil expert
   */
  static async createExpert(req, res) {
    try {
      const {
        name,
        specialty,
        hourlyRate,
        pricePerMessage,
        image,
        tags = [],
        category,
        languages = [],
        description
      } = req.body;

      // Validation des champs requis
      if (!name || !specialty || !hourlyRate || !pricePerMessage || !category) {
        return ApiResponse.badRequest(res, 'Tous les champs obligatoires doivent être remplis');
      }

      // Vérifier si l'utilisateur a déjà un profil expert
      const existingExpert = await prisma.expert.findUnique({
        where: { userId: req.user.id }
      });

      if (existingExpert) {
        return ApiResponse.badRequest(res, 'Vous avez déjà un profil expert');
      }

      // Créer le profil expert
      const expert = await prisma.expert.create({
        data: {
          userId: req.user.id,
          name,
          specialty,
          hourlyRate: parseInt(hourlyRate),
          pricePerMessage: parseInt(pricePerMessage),
          image,
          tags: JSON.stringify(tags),
          category,
          languages: JSON.stringify(languages),
          description
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      // Mettre à jour le type d'utilisateur
      await prisma.user.update({
        where: { id: req.user.id },
        data: { userType: 'expert' }
      });

      return ApiResponse.created(res, expert, 'Profil expert créé avec succès');

    } catch (error) {
      console.error('Create expert error:', error);
      return ApiResponse.error(res, 'Erreur lors de la création du profil expert');
    }
  }

  /**
   * Mettre à jour un profil expert
   */
  static async updateExpert(req, res) {
    try {
      const { id } = req.params;
      const expertId = parseInt(id);

      // Vérifier que l'expert appartient à l'utilisateur connecté
      const expert = await prisma.expert.findUnique({
        where: { id: expertId }
      });

      if (!expert) {
        return ApiResponse.notFound(res, 'Expert non trouvé');
      }

      if (expert.userId !== req.user.id) {
        return ApiResponse.forbidden(res, 'Vous ne pouvez modifier que votre propre profil');
      }

      const {
        name,
        specialty,
        hourlyRate,
        pricePerMessage,
        image,
        tags,
        category,
        languages,
        description,
        isOnline,
        nextAvailable
      } = req.body;

      // Préparer les données à mettre à jour
      const updateData = {};
      
      if (name !== undefined) updateData.name = name;
      if (specialty !== undefined) updateData.specialty = specialty;
      if (hourlyRate !== undefined) updateData.hourlyRate = parseInt(hourlyRate);
      if (pricePerMessage !== undefined) updateData.pricePerMessage = parseInt(pricePerMessage);
      if (image !== undefined) updateData.image = image;
      if (tags !== undefined) updateData.tags = JSON.stringify(tags);
      if (category !== undefined) updateData.category = category;
      if (languages !== undefined) updateData.languages = JSON.stringify(languages);
      if (description !== undefined) updateData.description = description;
      if (isOnline !== undefined) updateData.isOnline = isOnline;
      if (nextAvailable !== undefined) updateData.nextAvailable = nextAvailable;

      const updatedExpert = await prisma.expert.update({
        where: { id: expertId },
        data: updateData,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      return ApiResponse.success(res, updatedExpert, 'Profil expert mis à jour');

    } catch (error) {
      console.error('Update expert error:', error);
      return ApiResponse.error(res, 'Erreur lors de la mise à jour du profil expert');
    }
  }

  /**
   * Récupérer les catégories d'experts
   */
  static async getCategories(req, res) {
    try {
      const categories = await prisma.expert.findMany({
        select: { category: true },
        distinct: ['category']
      });

      const categoryList = categories.map(c => c.category).filter(Boolean);

      return ApiResponse.success(res, categoryList);

    } catch (error) {
      console.error('Get categories error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des catégories');
    }
  }
}

module.exports = ExpertController;

