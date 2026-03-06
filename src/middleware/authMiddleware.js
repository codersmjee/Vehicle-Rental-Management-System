const { verifyToken } = require('../utils/auth');

const protect = (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
    }
    
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    }
    
    req.user = decoded;
    next();
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'error', 
                message: `User role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
