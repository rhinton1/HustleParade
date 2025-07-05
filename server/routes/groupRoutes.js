const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, groupController.createGroup);
router.get('/', authMiddleware, groupController.getGroupsForUser);
router.post('/:groupId/members/add', authMiddleware, groupController.addGroupMember);
router.post('/:groupId/members/remove', authMiddleware, groupController.removeGroupMember);

module.exports = router;