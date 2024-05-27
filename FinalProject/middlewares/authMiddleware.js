const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (token) {
        try {
            const decoded = jwt.verify(token, config.get("myprivatekey"));
            req.session.user = decoded; 
            res.locals.user = req.session.user; 
        } catch (err) {
            res.clearCookie('auth_token'); 
        }
    }
    next();
};

module.exports = authMiddleware;
