require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { auth, users, games, words } = require("./routes");

function bodyChecker(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).send({
      error: "The request body is not valid JSON"
    })
  } else {
    next();
  }
}

let app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(
  cors({
    origin: process.env.HANGMAN_CLIENT_URL
  })
);


app.use(bodyParser.json());
app.use(bodyChecker);

const swaggerDocument = YAML.load(process.env.SWAGGER_CONFIG);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/words", words);

app.get('/',function (req, res) {
  res.redirect('/swagger');
});

module.exports = app;
