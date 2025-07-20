const Group = require('../models/Group');
const User = require('../models/Usr');

exports.createGroup = async (req, res) => {
    try {
        const { name, members } = req.body; // members = array of user ids

        if (!name) return res.status(400).json({ message: 'Group name is required' });

        const groupMembers = members || [];

        // Make sure user creating group is included
        if (!groupMembers.includes(req.user.id)) groupMembers.push(req.user.id);

        // Validate members exist
        const validUsers = await User.find({ _id: { $in: groupMembers } });

        if (validUsers.length !== groupMembers.length)
            return res.status(400).json({ message: 'Some members do not exist' });

        const group = new Group({
            name,
            members: groupMembers,
            admin: req.user.id
        });

        await group.save();

        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getGroupsForUser = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user.id }).populate('members', 'username email');
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.addGroupMember = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { userId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.admin.equals(req.user.id)) return res.status(403).json({ message: 'Only admin can add members' });

        if (group.members.includes(userId)) return res.status(400).json({ message: 'User already in group' });

        group.members.push(userId);
        await group.save();

        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.removeGroupMember = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { userId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.admin.equals(req.user.id)) return res.status(403).json({ message: 'Only admin can remove members' });

        group.members = group.members.filter(m => m.toString() !== userId);
        await group.save();

        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};