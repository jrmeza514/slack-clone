/* Core Module Imports */
var http = require('http');

/* NPM Module Imports */
var express = require('express');
var soi = require('socket.io');

/* Local Module Imports */
var app = express();

/* Route Imports */

var messageRouter = require('./routes/messages.js');
/* Global variable declarations */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use( '/messages', messageRouter );

var server = http.createServer( app );
var socket = soi( server );



app.listen( process.env.PORT || 8080 );
