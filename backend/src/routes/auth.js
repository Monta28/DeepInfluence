const express = require('express');
const AuthController = require('../controllers/auth/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Inscription d'un nouvel utilisateur
 * @access Public
 */
router.post('/register', AuthController.register);

/**
 * @route POST /api/auth/login
 * @desc Connexion d'un utilisateur
 * @access Public
 */
router.post('/login', AuthController.login);

/**
 * @route GET /api/auth/me
 * @desc Récupérer les informations de l'utilisateur connecté
 * @access Private
 */
router.get('/me', verifyToken, AuthController.me);

/**
 * @route POST /api/auth/logout
 * @desc Déconnexion d'un utilisateur
 * @access Private
 */
router.post('/logout', verifyToken, AuthController.logout);

/**
 * @route POST /api/auth/refresh
 * @desc Rafraîchir le token JWT
 * @access Private
 */
router.post('/refresh', verifyToken, AuthController.refreshToken);

module.exports = router;

