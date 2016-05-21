/* Core Module Imports */
var http = require('http');

/* NPM Module Imports */
var express = require('express');
var soi = require('socket.io');

/* Local Module Imports */
var app = express();

/* Global variable declarations */

var server = http.createServer( app );
var socket = soi( server );



app.listen( process.env.PORT || 8080 );
