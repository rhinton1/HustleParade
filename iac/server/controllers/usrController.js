const User = require('../models/Usr');

// Get public data of authenticated users (e.g. posts, music)
// For homepage public view of authenticated users' shares.
exports.getUserSharedData = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username.toLowerCase() }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Return basic user info (non-sensitive)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Add connection
exports.addConnection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { connectUserId } = req.body;

        if (userId === connectUserId) return res.status(400).json({ message: 'Cannot connect with yourself' });

        const user = await User.findById(userId);
        const connectUser = await User.findById(connectUserId);

        if (!connectUser) return res.status(404).json({ message: 'User to connect not found' });

        // Add connection both ways for mutual connection
        if (!user.connections.includes(connectUserId)) {
            user.connections.push(connectUserId);
            await user.save();
        }

        if (!connectUser.connections.includes(userId)) {
            connectUser.connections.push(userId);
            await connectUser.save();
        }

        res.status(200).json({ message: 'Connection added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Remove connection
exports.removeConnection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { connectUserId } = req.body;

        const user = await User.findById(userId);
        const connectUser = await User.findById(connectUserId);

        if (!connectUser) return res.status(404).json({ message: 'User to disconnect not found' });

        // Remove from connections
        user.connections = user.connections.filter(id => id.toString() !== connectUserId);
        await user.save();

        connectUser.connections = connectUser.connections.filter(id => id.toString() !== userId);
        await connectUser.save();

        res.status(200).json({ message: 'Connection removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};