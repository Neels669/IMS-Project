const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const extractUserId = require('../middleware/extractUserId');


// Middleware to authenticate JWT token
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

// Routes for users
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authenticateToken, userController.getUserDetails);
router.get('/user-details', authenticateToken, userController.getUserDetails);

module.exports = router;
