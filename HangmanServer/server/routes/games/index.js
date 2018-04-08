const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/user");
const verifyToken = require("../verifyToken");

const gamesRouter = express.Router();

gamesRouter.use(bodyParser.urlencoded({ extended: true }));
gamesRouter.use(bodyParser.json());

gamesRouter.get("/:id", function(req, res) {
  // query DB here
  return {
    word: "BANANAS",
    lettersGuessed: ["R", "T"],
    complete: false
  };
});

gamesRouter.get("/", verifyToken, function(req, res) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("User not found");
        err.status = 400;
        return next(err);
      } else {
        return res.send(user.games);
      }
    }
  });
});

gamesRouter.get("/current", function(req, res) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("User not found");
        err.status = 400;
        return next(err);
      } else {
        return res.send(user.currentGame);
      }
    }
  });
});

gamesRouter.post("/", verifyToken, function(req, res, next) {
  // TODO: if current game incomplete, cancel it (mark it as complete + add a loss to user lost tally)
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("User not found");
        err.status = 400;
        return next(err);
      } else {
        // TODO: query dictionary for word e.g. Dictionary.aggregate({ $sample: { size: 1 } })
        user.games.push({
          _word: "BANANAS",
          complete: false
        });

        user.save(function(err) {
          if (err) {
            return res.status(403).send({error: err.message});
          }

          return res.status(201).send(user.games[user.games.length -1]);
        });
      }
    }
  });
});

gamesRouter.patch("/current", verifyToken, function(req, res) {
  User.findById(req.userId)
    .exec(function(error, user) {
    if (error) {
      return res.status(500).send("Game was not updated.");
    } else {
      if (user === null) {
        return res.status(400).send("User not found");
      } else {
        if(user.games.length === 0) {
          return res.status(404).send("No games found");
        }

        const currentGame = user.games[user.games.length - 1];

        if (currentGame.complete) {
          return res.status(403).send("The current game is complete. Please start a new one!");
        }

        currentGame._lettersGuessed.push({letter: req.body.letter});

        user.save(function(err) {
          if (err) {
            return res.status(403).send({error: err.message});
          }

          return res.status(200).send(currentGame);
        });
      }
    }
  });
});

module.exports = gamesRouter;
