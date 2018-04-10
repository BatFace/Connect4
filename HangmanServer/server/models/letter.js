var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var LetterSchema = new mongoose.Schema({
  letter: {
    type: String,
    validate: {
      validator: function(value) {
        return /^[A-Z|a-z]$/.test(value);
      },
      message: '{VALUE} is not a valid letter'
    },
    set: function(v) {
      return v.toUpperCase();
    }
  }
});

LetterSchema.plugin(uniqueValidator, {
  message: "Expected {PATH} to be unique."
});

module.exports = LetterSchema;
