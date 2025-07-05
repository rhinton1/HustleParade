const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Public home page data route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to HustleParade backend' });
});

module.exports = app;