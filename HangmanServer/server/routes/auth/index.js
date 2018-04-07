const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../verifyToken");
const User = require("../../models/user");

const authRouter = express.Router();

authRouter.use(bodyParser.urlencoded({ extended: false }));
authRouter.use(bodyParser.json());

authRouter.post("/register", function(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    },
    function(err, user) {
      if (err) return res.status(500).send("User could not be created.");

      const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
        expiresIn: 86400
      });

      res.status(200).send({ auth: true, token: token });
    }
  );
});

authRouter.post("/login", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");

    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token });
  });
});

authRouter.get("/me", verifyToken, function(req, res) {
  User.findById(req.userId, ["username", "email", "-_id"], function(err, user) {
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
