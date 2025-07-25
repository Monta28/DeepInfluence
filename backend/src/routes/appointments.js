const express = require('express');
const AppointmentController = require('../controllers/appointments/appointmentController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/appointments
 * @desc Récupérer tous les rendez-vous de l'utilisateur
 * @access Private
 */
router.get('/', verifyToken, AppointmentController.getUserAppointments);

/**
 * @route POST /api/appointments
 * @desc Créer un nouveau rendez-vous
 * @access Private
 */
router.post('/', verifyToken, AppointmentController.createAppointment);

module.exports = router;

