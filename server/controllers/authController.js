const User = require('../models/Usr');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) return res.status(400).json({ message: 'Please provide username, email and password' });

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: 'Username or Email already registered' });

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = generateToken(newUser);

        return res.status(201).json({ token, user: { id: newUser._id, username, email } });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        if (!emailOrUsername || !password) return res.status(400).json({ message: 'Please provide email/username and password' });

        const user = await User.findOne({
            $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername.toLowerCase() }]
        });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);

        return res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });

    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};