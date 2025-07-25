const express = require('express');
const UserController = require('../controllers/users/userController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/users/profile
 * @desc Récupérer le profil de l'utilisateur
 * @access Private
 */
router.get('/profile', verifyToken, UserController.getProfile);

/**
 * @route PUT /api/users/profile
 * @desc Mettre à jour le profil de l'utilisateur
 * @access Private
 */
router.put('/profile', verifyToken, UserController.updateProfile);

/**
 * @route GET /api/users/stats
 * @desc Récupérer les statistiques de l'utilisateur
 * @access Private
 */
router.get('/stats', verifyToken, UserController.getStats);

module.exports = router;

