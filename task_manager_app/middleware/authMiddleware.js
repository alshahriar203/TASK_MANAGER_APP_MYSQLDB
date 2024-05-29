const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secret);
        req.userData = { username: decodedToken.username, role: decodedToken.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};
