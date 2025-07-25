const express = require('express');
const ExpertController = require('../controllers/experts/expertController');
const { verifyToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/experts
 * @desc Récupérer tous les experts
 * @access Public
 */
router.get('/', optionalAuth, ExpertController.getAllExperts);

/**
 * @route GET /api/experts/categories
 * @desc Récupérer les catégories d'experts
 * @access Public
 */
router.get('/categories', ExpertController.getCategories);

/**
 * @route GET /api/experts/:id
 * @desc Récupérer un expert par ID
 * @access Public
 */
router.get('/:id', optionalAuth, ExpertController.getExpertById);

/**
 * @route POST /api/experts
 * @desc Créer un profil expert
 * @access Private
 */
router.post('/', verifyToken, ExpertController.createExpert);

/**
 * @route PUT /api/experts/:id
 * @desc Mettre à jour un profil expert
 * @access Private
 */
router.put('/:id', verifyToken, ExpertController.updateExpert);

module.exports = router;

