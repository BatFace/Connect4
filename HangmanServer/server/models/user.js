var mongoose = require("mongoose");
var Game = require("./game");
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
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
    required: true
  },
  won: {
    type: Number,
    required: false,
    default: 0
  },
  lost: {
    type: Number,
    required: false,
    default: 0
  },
  games: [Game]
});

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

mongoose.model("User", UserSchema);

module.exports = mongoose.model("User");
