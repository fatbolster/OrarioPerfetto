const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Retrieve token from the request headers
  const authHeader = req.headers["authorization"];
  
  // Check if the authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer"

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is in your `.env` file
    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Call the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
