const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken") ;
const jwtSecrate = process.env.JWT_SECRET_KEY;

module.exports = verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (token != null || undefined) {
    const decoded = jwt.verify(token, jwtSecrate);
    const crrUser = await User.findOne({ email: decoded.email });
    req.user = crrUser;
    next();
  } else {
    res.status(400).json({ message: "You are not Login for this Work" });
  }
};