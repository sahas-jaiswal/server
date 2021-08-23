const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const env = require('dotenv');
const User = db.user;
env.config();


exports.signup = (req, res) =>  {

    const { firstname, lastname, email, contact, username, role } = req.body;
    User.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(req.body.password, 10), 
      username,
      contact,
      role,
    })
    .then(_user => {
        if(_user.role === "admin"){
            res.send({ message: "Admin is registered successfully!" });
            console.log(_user);
        }if(_user.role === "super-admin"){
            res.send({ message: "Super-Admin is registered successfully!" });
            console.log(_user);
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
     
};

exports.allUser = (req,res) => {
  User.findAll().then(data => {
    if (data) {
      res.status(200).json({ users: data });
    } if (error) {
      res.status(400).json({ error: error });
    }
  }).catch(err => {
    res.status(500).json({ error: err });
  });
}

exports.allAdmin = (req,res) => {
  User.findAll({ where : {
    role : "admin"
  }}).then((err, catagories) => {
      if(err){
        res.status(400).json({ message: err });
      }if(catagories){
        res.status(200).json({categories});
      }
  });
}



exports.signin = (req, res) => {
  User.findOne({where: {
      username: req.body.username
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

    res.status(200).json({
      token: token, user: {
            id: user.id,
            username: user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            email: user.email,
            contact: user.contact,
            role: user.role,
          }
        });

     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};

exports.deleteUser = (req, res) => {
  User.destroy({ where :{
    id:req.body.id
  }
  }).then(data => {
    if (data) {
      res.status(200).json({ message: "User deleted successfully." });
    } else {
      res.status(400).json({ error: error });
    }
  }).catch(err => {
    res.status(500).json({ error: error });
  })
}

