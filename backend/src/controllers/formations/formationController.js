const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des formations
 */
class FormationController {
  /**
   * Récupérer toutes les formations
   */
  static async getAllFormations(req, res) {
    try {
      const { 
        category, 
        level, 
        type,
        search, 
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
      
      if (level) {
        where.level = level;
      }
      
      if (type) {
        where.type = type;
      }
      
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { instructor: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ];
      }

      // Construire l'ordre de tri
      const orderBy = {};
      orderBy[sortBy] = order;

      const [formations, total] = await Promise.all([
        prisma.formation.findMany({
          where,
          orderBy,
          skip,
          take: parseInt(limit),
          include: {
            expert: {
              select: {
                id: true,
                name: true,
                image: true,
                verified: true
              }
            },
            enrollments: {
              select: {
                userId: true
              }
            }
          }
        }),
        prisma.formation.count({ where })
      ]);

      // Formater les données
      const formattedFormations = formations.map(formation => ({
        id: formation.id,
        title: formation.title,
        instructor: formation.instructor,
        duration: formation.duration,
        level: formation.level,
        rating: formation.rating,
        students: formation.students,
        price: formation.price,
        type: formation.type,
        maxPlaces: formation.maxPlaces,
        currentPlaces: formation.currentPlaces,
        location: formation.location,
        image: formation.image,
        tags: JSON.parse(formation.tags || '[]'),
        nextSession: formation.nextSession,
        description: formation.description,
        schedule: formation.schedule,
        modules: JSON.parse(formation.modules || '[]'),
        category: formation.category,
        expert: formation.expert,
        enrolledCount: formation.enrollments.length,
        isEnrolled: req.user ? formation.enrollments.some(e => e.userId === req.user.id) : false
      }));

      return ApiResponse.success(res, {
        formations: formattedFormations,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });

    } catch (error) {
      console.error('Get all formations error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des formations');
    }
  }

  /**
   * Récupérer une formation par ID
   */
  static async getFormationById(req, res) {
    try {
      const { id } = req.params;

      const formation = await prisma.formation.findUnique({
        where: { id: parseInt(id) },
        include: {
          expert: {
            select: {
              id: true,
              name: true,
              image: true,
              verified: true,
              rating: true,
              reviews: true
            }
          },
          enrollments: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          },
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      if (!formation) {
        return ApiResponse.notFound(res, 'Formation non trouvée');
      }

      // Formater les données
      const formattedFormation = {
        id: formation.id,
        title: formation.title,
        instructor: formation.instructor,
        duration: formation.duration,
        level: formation.level,
        rating: formation.rating,
        students: formation.students,
        price: formation.price,
        type: formation.type,
        maxPlaces: formation.maxPlaces,
        currentPlaces: formation.currentPlaces,
        location: formation.location,
        image: formation.image,
        tags: JSON.parse(formation.tags || '[]'),
        nextSession: formation.nextSession,
        description: formation.description,
        schedule: formation.schedule,
        modules: JSON.parse(formation.modules || '[]'),
        category: formation.category,
        expert: formation.expert,
        enrollments: formation.enrollments,
        reviews: formation.reviews,
        isEnrolled: req.user ? formation.enrollments.some(e => e.user.id === req.user.id) : false
      };

      return ApiResponse.success(res, formattedFormation);

    } catch (error) {
      console.error('Get formation by ID error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération de la formation');
    }
  }

  /**
   * Créer une nouvelle formation
   */
  static async createFormation(req, res) {
    try {
      const {
        title,
        duration,
        level,
        price,
        type,
        maxPlaces,
        location,
        image,
        tags = [],
        nextSession,
        description,
        schedule,
        modules = [],
        category
      } = req.body;

      // Validation des champs requis
      if (!title || !duration || !level || !price || !type || !maxPlaces || !category) {
        return ApiResponse.badRequest(res, 'Tous les champs obligatoires doivent être remplis');
      }

      // Vérifier que l'utilisateur est un expert
      const expert = await prisma.expert.findUnique({
        where: { userId: req.user.id }
      });

      if (!expert) {
        return ApiResponse.forbidden(res, 'Seuls les experts peuvent créer des formations');
      }

      // Créer la formation
      const formation = await prisma.formation.create({
        data: {
          title,
          instructorId: expert.id,
          instructor: expert.name,
          duration,
          level,
          price: parseInt(price),
          type,
          maxPlaces: parseInt(maxPlaces),
          location,
          image,
          tags: JSON.stringify(tags),
          nextSession,
          description,
          schedule,
          modules: JSON.stringify(modules),
          category
        },
        include: {
          expert: {
            select: {
              id: true,
              name: true,
              image: true,
              verified: true
            }
          }
        }
      });

      return ApiResponse.created(res, formation, 'Formation créée avec succès');

    } catch (error) {
      console.error('Create formation error:', error);
      return ApiResponse.error(res, 'Erreur lors de la création de la formation');
    }
  }

  /**
   * S'inscrire à une formation
   */
  static async enrollInFormation(req, res) {
    try {
      const { id } = req.params;
      const formationId = parseInt(id);

      // Vérifier que la formation existe
      const formation = await prisma.formation.findUnique({
        where: { id: formationId }
      });

      if (!formation) {
        return ApiResponse.notFound(res, 'Formation non trouvée');
      }

      // Vérifier si l'utilisateur est déjà inscrit
      const existingEnrollment = await prisma.userFormation.findUnique({
        where: {
          userId_formationId: {
            userId: req.user.id,
            formationId: formationId
          }
        }
      });

      if (existingEnrollment) {
        return ApiResponse.badRequest(res, 'Vous êtes déjà inscrit à cette formation');
      }

      // Vérifier s'il reste des places
      if (formation.currentPlaces >= formation.maxPlaces) {
        return ApiResponse.badRequest(res, 'Cette formation est complète');
      }

      // Vérifier si l'utilisateur a assez de coins
      if (req.user.coins < formation.price) {
        return ApiResponse.badRequest(res, 'Vous n\'avez pas assez de coins pour cette formation');
      }

      // Créer l'inscription et débiter les coins
      await prisma.$transaction(async (tx) => {
        // Créer l'inscription
        await tx.userFormation.create({
          data: {
            userId: req.user.id,
            formationId: formationId
          }
        });

        // Débiter les coins
        await tx.user.update({
          where: { id: req.user.id },
          data: {
            coins: { decrement: formation.price },
            formationsFollowed: { increment: 1 }
          }
        });

        // Mettre à jour le nombre de places
        await tx.formation.update({
          where: { id: formationId },
          data: {
            currentPlaces: { increment: 1 },
            students: { increment: 1 }
          }
        });

        // Créer une transaction
        await tx.transaction.create({
          data: {
            userId: req.user.id,
            type: 'spend',
            amount: formation.price * 100, // en centimes
            coins: formation.price,
            description: `Inscription à la formation: ${formation.title}`,
            relatedId: formationId
          }
        });
      });

      return ApiResponse.success(res, null, 'Inscription réussie à la formation');

    } catch (error) {
      console.error('Enroll in formation error:', error);
      return ApiResponse.error(res, 'Erreur lors de l\'inscription à la formation');
    }
  }

  /**
   * Récupérer les formations de l'utilisateur
   */
  static async getUserFormations(req, res) {
    try {
      const enrollments = await prisma.userFormation.findMany({
        where: { userId: req.user.id },
        include: {
          formation: {
            include: {
              expert: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            }
          }
        },
        orderBy: { enrolledAt: 'desc' }
      });

      const formattedEnrollments = enrollments.map(enrollment => ({
        ...enrollment,
        formation: {
          ...enrollment.formation,
          tags: JSON.parse(enrollment.formation.tags || '[]'),
          modules: JSON.parse(enrollment.formation.modules || '[]')
        }
      }));

      return ApiResponse.success(res, formattedEnrollments);

    } catch (error) {
      console.error('Get user formations error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des formations');
    }
  }
}

module.exports = FormationController;

