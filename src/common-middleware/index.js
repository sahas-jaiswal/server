const authJwt = require("./auth.jwt");
const verifySignUp = require("./verifySignUp");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null,shortid.generate() + '-' + file.originalname);
  },
});



module.exports = {
  authJwt,
  verifySignUp,
  upload : multer({ storage }),
};