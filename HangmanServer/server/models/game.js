const mongoose = require("mongoose");
const Letter = require("./letter");

const GameSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  },
  lettersGuessed: {
    type: [Letter],
    validate: [(val) => { return val.length <= 10 }, 'The permitted number of guesses has been reached']
  },
  complete: {
    type: Boolean,
    required: true
  }
});

module.exports = GameSchema;
