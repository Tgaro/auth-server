const bodyParser = require('body-parser');
const express = require('express');
const consign = require('consign');
const app = express();
const authStrategy = require('./service/strategy.service')();
const errorHandler = require('./middleware/error.middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authStrategy.initialize());

consign()
  .include('./src/routes')
  .into(app);

errorHandler(app);

module.exports = { app };
