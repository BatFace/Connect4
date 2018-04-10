require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

let app = express();

const { auth, users, games, words } = require("./routes");

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(
  cors({
    origin: process.env.HANGMAN_CLIENT_URL
  })
);

const swaggerDocument = YAML.load('./api.yml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/words", words);

app.get('/',function (req, res) {
  res.redirect('/swagger');
});

module.exports = app;
