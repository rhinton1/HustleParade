const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', postController.getPublicPostsByUser);
router.get('/', authMiddleware, postController.getPostsForUser);
router.post('/', authMiddleware, postController.createPost);

module.exports = router;