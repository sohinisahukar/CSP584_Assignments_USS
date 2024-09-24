// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], 'your_jwt_secret');  // Make sure the token is split correctly (Bearer token)
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const storeManagerOnly = (req, res, next) => {
  if (req.user.role !== 'StoreManager') {
    return res.status(403).json({ msg: 'Access denied: Only store managers can perform this action' });
  }
  next();
};

module.exports = { authMiddleware, storeManagerOnly };
