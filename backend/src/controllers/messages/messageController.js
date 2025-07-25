const prisma = require('../../services/database');
const ApiResponse = require('../../utils/response');

/**
 * Contrôleur pour la gestion des messages
 */
class MessageController {
  /**
   * Récupérer toutes les conversations de l'utilisateur
   */
  static async getConversations(req, res) {
    try {
      const conversations = await prisma.conversationParticipant.findMany({
        where: { userId: req.user.id },
        include: {
          conversation: {
            include: {
              participants: {
                where: { userId: { not: req.user.id } },
                include: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      avatar: true,
                      expert: {
                        select: {
                          id: true,
                          name: true,
                          image: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        orderBy: {
          conversation: {
            lastMessageTime: 'desc'
          }
        }
      });

      return ApiResponse.success(res, conversations);
    } catch (error) {
      console.error('Get conversations error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des conversations');
    }
  }

  /**
   * Récupérer les messages d'une conversation
   */
  static async getMessages(req, res) {
    try {
      const { conversationId } = req.params;
      const { page = 1, limit = 50 } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);

      const messages = await prisma.message.findMany({
        where: { conversationId: parseInt(conversationId) },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        },
        orderBy: { timestamp: 'desc' },
        skip,
        take: parseInt(limit)
      });

      return ApiResponse.success(res, messages.reverse());
    } catch (error) {
      console.error('Get messages error:', error);
      return ApiResponse.error(res, 'Erreur lors de la récupération des messages');
    }
  }

  /**
   * Envoyer un message
   */
  static async sendMessage(req, res) {
    try {
      const { conversationId } = req.params;
      const { content, receiverId } = req.body;

      const message = await prisma.message.create({
        data: {
          conversationId: parseInt(conversationId),
          senderId: req.user.id,
          receiverId: parseInt(receiverId),
          content
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      });

      // Mettre à jour la conversation
      await prisma.conversation.update({
        where: { id: parseInt(conversationId) },
        data: {
          lastMessage: content,
          lastMessageTime: new Date()
        }
      });

      return ApiResponse.created(res, message, 'Message envoyé');
    } catch (error) {
      console.error('Send message error:', error);
      return ApiResponse.error(res, 'Erreur lors de l\'envoi du message');
    }
  }
}

module.exports = MessageController;

