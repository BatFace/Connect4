var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var LetterSchema = new mongoose.Schema({
  letter: {
    type: String,
    validate: {
      validator: function(v) {
        return /[A-Za-z]/.test(v);
      },
      message: '{VALUE} is not a valid letter'
    },
    set: function(v) {
      return v.toUpperCase();
    }
  }
});

LetterSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = LetterSchema;
