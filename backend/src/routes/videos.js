const express = require('express');
const VideoController = require('../controllers/videos/videoController');
const { verifyToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @route GET /api/videos
 * @desc Récupérer toutes les vidéos
 * @access Public
 */
router.get('/', optionalAuth, VideoController.getAllVideos);

/**
 * @route GET /api/videos/:id
 * @desc Récupérer une vidéo par ID
 * @access Public
 */
router.get('/:id', optionalAuth, VideoController.getVideoById);

/**
 * @route POST /api/videos/:id/like
 * @desc Liker/Unliker une vidéo
 * @access Private
 */
router.post('/:id/like', verifyToken, VideoController.toggleLike);

module.exports = router;

