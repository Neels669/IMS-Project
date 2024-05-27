const jwt = require('jsonwebtoken');

const extractUserId = (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		// Verify the token and extract the userId
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		next(); // Move to the next middleware or route handler
	} catch (error) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
};

module.exports = extractUserId;
