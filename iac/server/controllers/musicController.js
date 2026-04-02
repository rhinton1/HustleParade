const Music = require('../models/Music');
const User = require('../models/Usr');

// Get music shared by a specific user (public only for non-authenticated)
exports.getPublicMusicByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const musicList = await Music.find({ user: user._id, public: true }).select('-url'); // exclude full music url for public, only clipUrl

        res.status(200).json(musicList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get full music for authenticated user (either own or if allowed)
// For simplicity, only allow owner for now
exports.getAllMusicForUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const musicList = await Music.find({ user: userId });

        res.status(200).json(musicList);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Upload music (metadata only, actual file handled by client to storage, or extend for multipart upload)
exports.uploadMusic = async (req, res) => {
    try {
        // Expect title, description, url (full music), clipUrl (partial clip), public (boolean)
        const { title, description, url, clipUrl, public: isPublic } = req.body;
        if (!title || !url || !clipUrl) return res.status(400).json({ message: 'Please provide title, url, clipUrl' });

        const music = new Music({
            user: req.user.id,
            title,
            description,
            url,
            clipUrl,
            public: isPublic === undefined ? true : isPublic
        });

        await music.save();

        res.status(201).json(music);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete music (owner only)
exports.deleteMusic = async (req, res) => {
    try {
        const { musicId } = req.params;
        const userId = req.user.id;

        const music = await Music.findById(musicId);
        if (!music) return res.status(404).json({ message: 'Music not found' });

        if (music.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own music' });
        }

        await Music.findByIdAndDelete(musicId);

        res.status(200).json({ message: 'Music deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update music (owner only)
exports.updateMusic = async (req, res) => {
    try {
        const { musicId } = req.params;
        const { title, description, url, clipUrl, public: isPublic } = req.body;
        const userId = req.user.id;

        const music = await Music.findById(musicId);
        if (!music) return res.status(404).json({ message: 'Music not found' });

        if (music.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only update your own music' });
        }

        if (title !== undefined) music.title = title;
        if (description !== undefined) music.description = description;
        if (url !== undefined) music.url = url;
        if (clipUrl !== undefined) music.clipUrl = clipUrl;
        if (isPublic !== undefined) music.public = isPublic;

        await music.save();

        res.status(200).json(music);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
