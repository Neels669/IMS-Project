const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const extractUserId = require('../middleware/extractUserId');

// Routes for users
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authenticateToken, userController.getUserDetails);

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = userId;
    next();
  });
}

// Apply the extractUserId middleware to the getUserDetails route
router.get('/user-details', extractUserId, userController.getUserDetails);

module.exports = router;
