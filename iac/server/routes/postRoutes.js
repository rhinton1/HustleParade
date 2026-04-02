const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', postController.getPublicPostsByUser);
router.get('/user', authMiddleware, postController.getPostsForUser);
router.post('/', authMiddleware, postController.createPost);
router.put('/:postId', authMiddleware, postController.updatePost);
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;