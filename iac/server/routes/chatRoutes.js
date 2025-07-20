const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, chatController.createChat);
router.get('/', authMiddleware, chatController.getChatsForUser);
router.post('/:chatId/messages', authMiddleware, chatController.sendMessage);

module.exports = router;