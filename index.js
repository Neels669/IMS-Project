import express from 'express';
import bodyParser from 'body-parser';
import { join } from 'path';
import db from './models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userController from './controllers/userController.js';
import orderItemRoutes from './routes/orderItemRoutes.js';
import stockMovementRoutes from './routes/stockMovementRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route 
app.get('/', (req, res) => {
  res.send('Inventory Management System API is running');
});

// API Endpoints
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.post('/api/register', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.get('/api/user-details', authenticateToken, userController.getUserDetails);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/stock-movements', stockMovementRoutes);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId;
    next();
  });
}

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

export default app;
