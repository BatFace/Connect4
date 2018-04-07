require("dotenv").config();

var express = require("express");
var app = express();
var mongoose = require("mongoose");

const { auth, users, games } = require("./routes");

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/games", games);

// // seed dictionary table
// // TODO: use SOWPODs zip, eventually load from a DB backup image
// var Word = require("./models/word");
//
// const dictionary = [
//   { word: 'AARDVARK', letters: 8 },
//   { word: 'BANANAS', letters: 7 }
// ];
//
// for (dictionaryEntry of dictionary) {
//   var newWord = new Word(dictionaryEntry);
//   newWord.save();
// }

module.exports = app;
