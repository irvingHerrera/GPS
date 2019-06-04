const express = require('express');
const controller = require('../controller/gpsController');
const app = express();

app.get('/GetGPSEvens', controller.getGPSEvents);

module.exports = app;