import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userController = {
  registerUser: async (req, res) => {
    try {
      const existingUser = await db.User.findOne({ where: { username: req.body.username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await db.User.create({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role
      });

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
      const user = await db.User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserDetails: async (req, res) => {
    try {
      const userId = req.userId;
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

export default userController;
