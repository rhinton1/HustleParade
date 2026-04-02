const Post = require('../models/Post');
const User = require('../models/Usr');

// Get public posts from a user (non-authenticated)
exports.getPublicPostsByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const posts = await Post.find({ user: user._id, public: true });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create new post (authenticated user)
exports.createPost = async (req, res) => {
    try {
        // content, images (array), public boolean
        const { content, images, public: isPublic } = req.body;
        if (!content) return res.status(400).json({ message: 'Content cannot be empty' });

        const post = new Post({
            user: req.user.id,
            content,
            images: images || [],
            public: typeof isPublic === 'boolean' ? isPublic : true,
        });

        await post.save();

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get private and public posts for a user (own posts)
exports.getPostsForUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const posts = await Post.find({ user: userId });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a post (owner only)
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own posts' });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update a post (owner only)
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, images, public: isPublic } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only update your own posts' });
        }

        if (content !== undefined) post.content = content;
        if (images !== undefined) post.images = images;
        if (isPublic !== undefined) post.public = isPublic;

        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
