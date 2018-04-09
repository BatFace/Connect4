const express = require("express");
const bodyParser = require("body-parser");
const User = require("../../models/user");
const Word = require("../../models/word");
const verifyToken = require("../verifyToken");

const gamesRouter = express.Router();

gamesRouter.use(bodyParser.urlencoded({ extended: true }));
gamesRouter.use(bodyParser.json());

gamesRouter.get("/:id", verifyToken, function(req, res) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return res.status(500).send("There was a problem fetching the game.");
    } else {
      if (user === null) {
        return res.status(403).send("User not found");
      } else {
        const game = user.games.id(req.params.id);
        if(game) {
          return res.status(200).send(user.games);
        } else {
          return res.status(404).send("Game not found");
        }
      }
    }
  });
});

gamesRouter.get("/", verifyToken, function(req, res) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return res.status(500).send("There was a problem fetching the games.");
    } else {
      if (user === null) {
        return res.status(403).send("User not found");
      } else {
        return res.status(200).send(user.games);
      }
    }
  });
});

gamesRouter.get("/current", function(req, res) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return res.status(500).send("There was a problem fetching the current game.");
    } else {
      if (user === null) {
        return res.status(403).send("User not found");
      } else {
        return res.send(user.currentGame);
      }
    }
  });
});

gamesRouter.post("/", verifyToken, function(req, res, next) {
  User.findById(req.userId).exec(function(error, user) {
    if (error) {
      return res.status(500).send("There was a problem creating a new game.");
    } else {
      if (user === null) {
        return res.status(403).send("User not found");
      } else {
        Word.aggregate([
          { $sample: { size: 1 } }
        ], function(err, result) {
          user.games.push({
            _word: result[0].word,
            complete: false
          });

          user.save(function(err) {
            if (err) {
              return res.status(403).send({error: err.message});
            }

            return res.status(201).send(user.games[user.games.length -1]);
          });
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
        return res.status(403).send("User not found");
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
