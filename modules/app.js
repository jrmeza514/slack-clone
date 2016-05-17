var express = require('express');
var app = express();

var _www = __dirname + '/../public/www/';

/* Server Routes */
app.use( express.static( _www ) );

module.exports = app;
