const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("../verifyToken");
const User = require("../../models/user");

let userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get("/", function(req, res) {
  User.find({}, "-__v",  function(err, users) {
    if (err) {
      return res.status(500).send("There was a problem fetching the users.");
    }

    res.status(200).send(users);
  });
});

userRouter.get("/:id", verifyToken, function(req, res) {
  User.findById(req.params.id, "-__v",  function(error, user) {
    if (error) {
      return res.status(500).send("There was a problem fetching the user.");
    }

    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

module.exports = userRouter;
