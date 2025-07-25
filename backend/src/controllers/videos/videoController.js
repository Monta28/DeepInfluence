const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des vidéos
 */
class VideoController {
  /**
   * Récupérer toutes les vidéos
   */
  static async getAllVideos(req, res) {
    try {
      const { 
        category, 
        type,
        search, 
        sortBy = 'publishedAt',
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
      
      if (type) {
        where.type = type;
      }
      
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { expert: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ];
      }

      // Construire l'ordre de tri
      const orderBy = {};
      orderBy[sortBy] = order;

      const [videos, total] = await Promise.all([
        prisma.video.findMany({
          where,
          orderBy,
          skip,
          take: parseInt(limit),
          include: {
            expertRel: {
              select: {
                id: true,
                name: true,
                image: true,
                verified: true
              }
            }
          }
        }),
        prisma.video.count({ where })
      ]);

      return ApiResponse.success(res, {
        videos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });

    } catch (error) {
      console.error('Get all videos error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des vidéos');
    }
  }

  /**
   * Récupérer une vidéo par ID
   */
  static async getVideoById(req, res) {
    try {
      const { id } = req.params;

      const video = await prisma.video.findUnique({
        where: { id: parseInt(id) },
        include: {
          expertRel: {
            select: {
              id: true,
              name: true,
              image: true,
              verified: true
            }
          }
        }
      });

      if (!video) {
        return ApiResponse.notFound(res, 'Vidéo non trouvée');
      }

      // Incrémenter le nombre de vues
      await prisma.video.update({
        where: { id: parseInt(id) },
        data: { views: { increment: 1 } }
      });

      return ApiResponse.success(res, video);

    } catch (error) {
      console.error('Get video by ID error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération de la vidéo');
    }
  }

  /**
   * Liker/Unliker une vidéo
   */
  static async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const videoId = parseInt(id);

      // Vérifier si la vidéo existe
      const video = await prisma.video.findUnique({
        where: { id: videoId }
      });

      if (!video) {
        return ApiResponse.notFound(res, 'Vidéo non trouvée');
      }

      // Vérifier si l'utilisateur a déjà liké
      const existingLike = await prisma.userVideo.findUnique({
        where: {
          userId_videoId: {
            userId: req.user.id,
            videoId: videoId
          }
        }
      });

      let liked = false;

      if (existingLike) {
        // Toggle le like
        liked = !existingLike.liked;
        await prisma.userVideo.update({
          where: {
            userId_videoId: {
              userId: req.user.id,
              videoId: videoId
            }
          },
          data: { liked }
        });
      } else {
        // Créer un nouveau like
        liked = true;
        await prisma.userVideo.create({
          data: {
            userId: req.user.id,
            videoId: videoId,
            liked: true
          }
        });
      }

      // Mettre à jour le compteur de likes
      const increment = liked ? 1 : -1;
      await prisma.video.update({
        where: { id: videoId },
        data: { likes: { increment } }
      });

      return ApiResponse.success(res, { liked }, liked ? 'Vidéo likée' : 'Like retiré');

    } catch (error) {
      console.error('Toggle like error:', error);
      return ApiResponse.error(res, 'Erreur lors du like');
    }
  }
}

module.exports = VideoController;

