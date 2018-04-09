const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  }
});

mongoose.model("Word", WordSchema);

module.exports = mongoose.model("Word");
