const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies?.token;

    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        token = authHeader;
    }

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
};

module.exports = authMiddleware;