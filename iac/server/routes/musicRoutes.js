const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', musicController.getPublicMusicByUser);
router.get('/', authMiddleware, musicController.getAllMusicForUser);
router.post('/upload', authMiddleware, musicController.uploadMusic);

module.exports = router;