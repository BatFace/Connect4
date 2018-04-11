const express = require("express");
const verifyToken = require("../verifyToken");
const User = require("../../models/user");

let userRouter = express.Router();

userRouter.get("/", function(req, res) {
  User.find({}, "-__v", function(err, users) {
    if (err) {
      return res
        .status(500)
        .send({ error: "There was a problem fetching users." });
    }

    res.status(200).send(users);
  });
});

userRouter.get("/:id", verifyToken, function(req, res) {
  User.findById(req.params.id, "-__v", function(error, user) {
    if (error) {
      return res
        .status(500)
        .send({ error: "There was a problem fetching users." });
    }

    if (!user) {
      return res.status(404).send({ error: "No user found" });
    }
    res.status(200).send(user);
  });
});

module.exports = userRouter;
