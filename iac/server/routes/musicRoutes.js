const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', musicController.getPublicMusicByUser);
router.get('/user', authMiddleware, musicController.getAllMusicForUser);
router.post('/', authMiddleware, musicController.uploadMusic);
router.post('/upload', authMiddleware, musicController.uploadMusic); // Alias for backward compatibility
router.put('/:musicId', authMiddleware, musicController.updateMusic);
router.delete('/:musicId', authMiddleware, musicController.deleteMusic);

module.exports = router;