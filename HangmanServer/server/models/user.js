const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const privatePaths = require('mongoose-private-paths');
const Game = require("./game");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    private: true
  },
  games: [Game]
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });

UserSchema.virtual("currentGame").get(function () {
  const currentGame = this.games.length > 0 && this.games[this.games.length - 1];
  return currentGame ? currentGame : null;
});

UserSchema.virtual("won").get(function () {
  if(this.games.length > 0) {
    return this.games.reduce((acc, game) => {
      return game.complete && game.won ? acc + 1 : acc;
    }, 0);
  }
  return 0;
});

UserSchema.virtual('lost').get(function () {
  if(this.games.length > 0) {
    return this.games.reduce((acc, game) => {
      return game.complete && !game.won ? acc + 1 : acc;
    }, 0);
  }
  return 0;
});

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
UserSchema.plugin(privatePaths, { ignore: ["id"] });

mongoose.model("User", UserSchema);

module.exports = mongoose.model("User");
