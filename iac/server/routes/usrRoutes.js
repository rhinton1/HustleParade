const express = require('express');
const router = express.Router();
const userController = require('../controllers/usrController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/public/:username', userController.getUserSharedData);
router.post('/connections/add', authMiddleware, userController.addConnection);
router.post('/connections/remove', authMiddleware, userController.removeConnection);

module.exports = router;