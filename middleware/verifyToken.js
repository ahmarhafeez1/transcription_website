require('dotenv').config()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; // Replace with your own secret key

const verifyToken = (req, res, next) => {

  // Get the token from the request headers
  const token = req.headers.authorization;
  console.log(SECRET_KEY)
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Store the decoded token payload in the request object
    console.log(req.user)
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = verifyToken
