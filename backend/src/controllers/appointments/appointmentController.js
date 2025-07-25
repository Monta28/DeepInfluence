const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des rendez-vous
 */
class AppointmentController {
  /**
   * Récupérer tous les rendez-vous de l'utilisateur
   */
  static async getUserAppointments(req, res) {
    try {
      const { status } = req.query;
      
      const where = { userId: req.user.id };
      if (status) {
        where.status = status;
      }

      const appointments = await prisma.appointment.findMany({
        where,
        include: {
          expertRel: {
            select: {
              id: true,
              name: true,
              image: true,
              verified: true
            }
          },
          formation: {
            select: {
              id: true,
              title: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return ApiResponse.success(res, appointments);
    } catch (error) {
      console.error('Get user appointments error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des rendez-vous');
    }
  }

  /**
   * Créer un nouveau rendez-vous
   */
  static async createAppointment(req, res) {
    try {
      const {
        expertId,
        type,
        date,
        time,
        duration,
        category,
        formationId
      } = req.body;

      // Vérifier que l'expert existe
      const expert = await prisma.expert.findUnique({
        where: { id: parseInt(expertId) }
      });

      if (!expert) {
        return ApiResponse.notFound(res, 'Expert non trouvé');
      }

      const appointment = await prisma.appointment.create({
        data: {
          userId: req.user.id,
          expertId: parseInt(expertId),
          expert: expert.name,
          type,
          date,
          time,
          duration,
          price: expert.hourlyRate,
          coins: expert.hourlyRate,
          status: 'confirmed',
          category,
          formationId: formationId ? parseInt(formationId) : null,
          image: expert.image
        },
        include: {
          expertRel: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });

      return ApiResponse.created(res, appointment, 'Rendez-vous créé');
    } catch (error) {
      console.error('Create appointment error:', error);
      return ApiResponse.error(res, 'Erreur lors de la création du rendez-vous');
    }
  }
}

module.exports = AppointmentController;

