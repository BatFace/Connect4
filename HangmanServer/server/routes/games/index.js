const express = require("express");
// var Http = require("http");
const bodyParser = require("body-parser");
const Game = require("../../models/game");
const User = require("../../models/user");
const verifyToken = require("../verifyToken");

const gamesRouter = express.Router();

gamesRouter.use(bodyParser.urlencoded({ extended: true }));
gamesRouter.use(bodyParser.json());

// TODO: remember to hide words from API consumers!
gamesRouter.get("/:id", function(req, res) {
  // query DB here
  return {
    word: "BANANAS",
    lettersGuessed: ["R", "T"],
    complete: false
  };
});

gamesRouter.post("/", verifyToken, function(req, res, next) {
  // if current game incomplete, cancel it (mark it as complete + add a loss to user lost tally)
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
          word: "BANANAS",
          lettersGuessed: [],
          complete: false
        });

        user.save(function(err) {
          if (err) {
            return next(err);
          }
          res.status = 201;
          return res.send(user.games[user.games.length -1]);
        });
      }
    }
  });
});

gamesRouter.patch("/:id", verifyToken, function(req, res, next) {
  User.findById(req.userId)
    .exec(function(error, user) {
    if (error) {
      return res.status(500).send("Game was not updated.");
    } else {
      if (user === null) {
        const err = new Error("User not found");
        err.status = 400;
        return res.send(err);
      } else {
        if(user.games.length === 0) {
          const err = new Error(`No games found`);
          err.status = 404;
          return res.send(err);
        }

        const currentGameId = user.games[user.games.length - 1].id;

        if (currentGameId !== req.params.id) {
          const err = new Error(`${req.params.id} is not the current game, ${currentGameId} is`);
          err.status = 403;
          return res.send(err);
        }

        user.games.id(currentGameId).lettersGuessed.push({letter: req.body.letter});

        user.save(function(err) {
          if (err) {
            return res.send(err);
          }
          return res.send(user.games.id(currentGameId));
        });
      }
    }
  });
});




module.exports = gamesRouter;
