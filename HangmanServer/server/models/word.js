var mongoose = require("mongoose");

var WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  },
  letters: {
    type: Number,
    required: true
  }
});

mongoose.model("Word", WordSchema);

module.exports = mongoose.model("Word");
