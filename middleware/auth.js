const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; // Use the same secret as above

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
