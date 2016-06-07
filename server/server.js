/* Core Module Imports */
const http = require('http');
const bodyParser = require('body-parser');

/* NPM Module Imports */
const express = require('express');
const soi = require('socket.io');

/* Route Imports */
const apiRouter = require('./routes/api/ApiRouter.js');

const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/api', apiRouter);

const server = http.createServer(app);
const socket = soi(server);

app.listen(process.env.PORT || 8080);
