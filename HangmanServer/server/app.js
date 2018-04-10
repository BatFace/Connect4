require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

let app = express();

const { auth, users, games, words } = require("./routes");

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(
  cors({
    origin: process.env.HANGMAN_CLIENT_URL
  })
);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/words", words);

module.exports = app;
