const Story = require('../models/Story');
const User = require('../models/Usr');

exports.getStoriesForUser = async (req, res) => {
    try {
        // Return stories for a user that are not expired
        const { username } = req.params;
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const now = new Date();

        const stories = await Story.find({
            user: user._id,
            $or: [
                { expiresAt: { $gt: now } },
                { expiresAt: null }
            ]
        });

        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.createStory = async (req, res) => {
    try {
        const { data, expiresAt } = req.body;

        if (!data) return res.status(400).json({ message: 'Data is required' });

        const story = new Story({
            user: req.user.id,
            data,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
        });

        await story.save();

        res.status(201).json(story);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};