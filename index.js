const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Inventory Management System API');
});

// Import and use Category routes
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/categories', categoryRoutes);

// Import and use Product routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

// Import and use Order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

// Import and use User routes
const userController = require('./controllers/userController');
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.get('/user-details', authenticateToken, userController.getUserDetails);


// Import and use Order Item routes
const orderItemRoutes = require('./routes/orderItemRoutes');
app.use('/order-items', orderItemRoutes);

// Import and use Stock Movement routes
const stockMovementRoutes = require('./routes/stockMovementRoutes');
app.use('/stock-movements', stockMovementRoutes);

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
});

module.exports = app;
