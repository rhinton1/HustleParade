const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', storyController.getStoriesForUser);
router.post('/', authMiddleware, storyController.createStory);

module.exports = router;