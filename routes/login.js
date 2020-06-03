var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'login correcto'
    });

});








module.exports = app;