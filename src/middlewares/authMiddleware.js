const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Acceso no autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Acceso no autorizado' });
    }
};

module.exports = authMiddleware;