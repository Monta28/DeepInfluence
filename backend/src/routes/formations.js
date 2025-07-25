const express = require('express');
const FormationController = require('../controllers/formations/formationController');
const { verifyToken, optionalAuth, requireExpert } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/formations
 * @desc Récupérer toutes les formations
 * @access Public
 */
router.get('/', optionalAuth, FormationController.getAllFormations);

/**
 * @route GET /api/formations/my
 * @desc Récupérer les formations de l'utilisateur
 * @access Private
 */
router.get('/my', verifyToken, FormationController.getUserFormations);

/**
 * @route GET /api/formations/:id
 * @desc Récupérer une formation par ID
 * @access Public
 */
router.get('/:id', optionalAuth, FormationController.getFormationById);

/**
 * @route POST /api/formations
 * @desc Créer une nouvelle formation
 * @access Private (Expert only)
 */
router.post('/', verifyToken, requireExpert, FormationController.createFormation);

/**
 * @route POST /api/formations/:id/enroll
 * @desc S'inscrire à une formation
 * @access Private
 */
router.post('/:id/enroll', verifyToken, FormationController.enrollInFormation);

module.exports = router;

