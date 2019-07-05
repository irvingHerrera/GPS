const express = require('express');
const controller = require('../controller/unitController');
const app = express();

app.get('/GetDataUnit', controller.getDataUnit);

module.exports = app;