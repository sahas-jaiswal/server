const jwt = require("jsonwebtoken");
const env = require("dotenv");
const db = require("../models");
const User = db.user;
env.config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user = decoded;
    next();
  });
};

adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({ message: "Super Admin access denied" });
  }
  next();
};

const authJwt = {
  verifyToken: verifyToken,
  adminMiddleware: adminMiddleware,
  superAdminMiddleware: superAdminMiddleware, 
};
module.exports = authJwt;