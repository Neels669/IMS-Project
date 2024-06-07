import express from 'express';
import jwt from 'jsonwebtoken';
import userController from '../controllers/userController.js';
import extractUserId from '../middleware/extractUserId.js';

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authenticateToken, userController.getUserDetails);
router.get('/user-details', authenticateToken, userController.getUserDetails);

export default router;
