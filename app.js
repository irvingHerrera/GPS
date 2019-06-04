//require
var express = require('express');
var bodyParser = require('body-parser');

//init express
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// importar rutas
const gps = require('./src/route/gpsRoute');

// Rutas
app.use('/', gps);

// Escuchar peticiones
app.listen(2210, () => {
    console.log("Server port 3001 online");
});