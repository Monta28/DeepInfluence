const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des utilisateurs
 */
class UserController {
  /**
   * Récupérer le profil de l'utilisateur
   */
  static async getProfile(req, res) {
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

      return ApiResponse.success(res, user);
    } catch (error) {
      console.error('Get profile error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération du profil');
    }
  }

  /**
   * Mettre à jour le profil de l'utilisateur
   */
  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, phone, bio, location, avatar } = req.body;

      const updateData = {};
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (phone !== undefined) updateData.phone = phone;
      if (bio !== undefined) updateData.bio = bio;
      if (location !== undefined) updateData.location = location;
      if (avatar !== undefined) updateData.avatar = avatar;

      const user = await prisma.user.update({
        where: { id: req.user.id },
        data: updateData,
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
          coins: true
        }
      });

      return ApiResponse.success(res, user, 'Profil mis à jour');
    } catch (error) {
      console.error('Update profile error:', error);
      return ApiResponse.error(res, 'Erreur lors de la mise à jour du profil');
    }
  }

  /**
   * Récupérer les statistiques de l'utilisateur
   */
  static async getStats(req, res) {
    try {
      const stats = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          sessionsCompleted: true,
          formationsFollowed: true,
          learningHours: true,
          expertsFollowed: true,
          coins: true
        }
      });

      return ApiResponse.success(res, stats);
    } catch (error) {
      console.error('Get stats error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des statistiques');
    }
  }
}

module.exports = UserController;

