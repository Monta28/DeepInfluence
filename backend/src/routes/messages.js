const express = require('express');
const MessageController = require('../controllers/messages/messageController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/messages/conversations
 * @desc Récupérer toutes les conversations de l'utilisateur
 * @access Private
 */
router.get('/conversations', verifyToken, MessageController.getConversations);

/**
 * @route GET /api/messages/conversation/:conversationId
 * @desc Récupérer les messages d'une conversation
 * @access Private
 */
router.get('/conversation/:conversationId', verifyToken, MessageController.getMessages);

/**
 * @route POST /api/messages/conversation/:conversationId
 * @desc Envoyer un message
 * @access Private
 */
router.post('/conversation/:conversationId', verifyToken, MessageController.sendMessage);

module.exports = router;

