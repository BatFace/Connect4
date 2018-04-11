const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../verifyToken");
const User = require("../../models/user");

const authRouter = express.Router();

authRouter.post("/register", function(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      username: req.body.username,
      password: hashedPassword
    },
    function(err, user) {
      if (err) return res.status(403).send({ error: err.message });

      const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
        expiresIn: 86400
      });

      res.status(201).send({ token: token });
    }
  );
});

authRouter.post("/login", function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) return res.status(500).send({ error: "Error on the server." });

    if (!user) return res.status(404).send({ error: "No user found." });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send({ token: null });

    const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
      expiresIn: 86400
    });

    res.status(200).send({ token: token });
  });
});

authRouter.get("/me", verifyToken, function(req, res) {
  User.findById(req.userId, function(err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }

    if (!user) {
      return res.status(404).send(`No user found. ${req.userId}`);
    }

    res.status(200).send(user);
  });
});

module.exports = authRouter;
