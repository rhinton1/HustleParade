require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const connectDBAtlas = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const usrRoutes = require('./routes/usrRoutes');
const musicRoutes = require('./routes/musicRoutes');
const postRoutes = require('./routes/postRoutes');
const storyRoutes = require('./routes/storyRoutes');
const groupRoutes = require('./routes/groupRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
connectDBAtlas();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usrRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/chats', chatRoutes);

// Public home page data route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to HustleParade backend' });
});

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

module.exports = app;