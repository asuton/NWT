const jwt = require("jsonwebtoken");
const config = require("config");

// funkcija koja ima pristup request i response objektima
// next je callback koji treba pozvati kad smo gotovi
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //postavljanje request user na dekodiranog usera
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
