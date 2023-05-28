const jwt = require('jsonwebtoken');

// Middleware for cookie-based JWT authentication
exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    // Verify the JWT token
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = user; // Attach the user object to the request for further use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.clearCookie("token"); // Clear the token cookie on verification failure
    return res.json({ status: false }); // Respond with status:false indicating authentication failure
  }
};
