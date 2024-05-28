const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller functions for users
const userController = {
	registerUser: async (req, res) => {
		try {
			// Check if user with the same username/email already exists
			const existingUser = await db.User.findOne({ where: { username: req.body.username } });
			if (existingUser) {
				return res.status(400).json({ error: 'Username already exists' });
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			// Create new user
			const newUser = await db.User.create({
				username: req.body.username,
				password: hashedPassword,
				role: req.body.role
			});

			// Exclude password from the response
			const userWithoutPassword = {
				id: newUser.id,
				username: newUser.username,
				role: newUser.role,
				createdAt: newUser.createdAt,
				updatedAt: newUser.updatedAt
			};

			res.json(userWithoutPassword);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	loginUser: async (req, res) => {
		try {
			// Find user by username
			const user = await db.User.findOne({ where: { username: req.body.username } });
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			// Check if password is correct
			const passwordMatch = await bcrypt.compare(req.body.password, user.password);
			if (!passwordMatch) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}

			// Generate JWT token
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

			res.json({ token });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getUserDetails: async (req, res) => {
		try {
			const userId = req.userId; // Extracted from JWT token middleware
			const user = await db.User.findByPk(userId, { attributes: { exclude: ['password'] } });
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			res.json(user);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};

module.exports = userController;
