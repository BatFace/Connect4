const mongoose = require("mongoose");
const Letter = require("./letter");
const privatePaths = require("mongoose-private-paths");

const GameSchema = new mongoose.Schema(
  {
    _word: {
      type: String,
      required: true,
      trim: true
    },
    _lettersGuessed: {
      type: [Letter]
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

GameSchema.virtual("lettersGuessed").get(function() {
  return this._lettersGuessed.map(l => l.letter);
});

GameSchema.virtual("progress").get(function() {
  return this._word
    .split("")
    .map(
      letter => (this.lettersGuessed.indexOf(letter) !== -1 ? letter : null)
    );
});

GameSchema.virtual("misses").get(function() {
  const uniqueGuesses = [...new Set(this.lettersGuessed)];
  const duplicateGuessCount = this.lettersGuessed.length - uniqueGuesses.length;
  return uniqueGuesses.reduce(
    (acc, letter) => (this._word.indexOf(letter) === -1 ? acc + 1 : acc),
    duplicateGuessCount
  );
});

GameSchema.virtual("complete").get(function() {
  return this.misses === 10 || this.progress.indexOf(null) === -1;
});

GameSchema.virtual("won").get(function() {
  return this.complete && this.progress.indexOf(null) === -1;
});

GameSchema.plugin(privatePaths, { ignore: ["id"] });

module.exports = GameSchema;
