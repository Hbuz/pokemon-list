const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

//Signup
router.post("/signup", (req, res) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.findOne({
    where: {
      username: user.username
    }
  }).then(userFound => {
      if (userFound) {
        res.status(400).send({
          message: "The username already exists"
        });
      } else {
        User.create(user)
          .then(entity => {
            res.status(201);
            res.json({
              id: entity.id,
              username: entity.username
            });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send({
              message: "Something went wrong"
            });
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});


//Login
router.post("/logins", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).send({
      message: "Please supply a valid username and password"
    });
  } else {
    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (!user) {
          res.status(400).send({
            message: "The username does not exist"
          });
        }
        else if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            username: username,
            userId: user.id,
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});


module.exports = router;
