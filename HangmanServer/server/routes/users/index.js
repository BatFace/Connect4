var express = require("express");
var bodyParser = require("body-parser");
var verifyToken = require("../verifyToken");
var User = require("../../models/user");

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get("/", function(req, res) {
  const requestedFull = req.query.full === "true";

  if(requestedFull){
    User.find({}, {games: { $slice: -1 }}, function(error, users) {
      if (error) {
        return res.status(500).send("There was a problem fetching the users.");
      }
      res.status(200).send(users);
    });
  } else {
    User.find({}, ["username", "email", "-_id"], function(err, users) {
      if (err) {
        return res.status(500).send("There was a problem fetching the users.");
      }
      res.status(200).send(users);
    });
  }
});

userRouter.get("/:id", verifyToken, function(req, res) {
  User.findById(req.params.id, function(error, user) {
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