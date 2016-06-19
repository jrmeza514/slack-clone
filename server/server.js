/* Core Module Imports */
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/* NPM Module Imports */
const express = require('express');
const soi = require('socket.io');

/* Route Imports */
const apiRouter = require('./routes/api/ApiRouter');
const appRouter = require('./routes/app/AppRouter');

const app = express();
const server = http.createServer(app);
const socket = soi(server);

app.set('view engine', 'jade');

app.set('views', '../app/views');

// app.use('/css', express.static(`${__dirname}/../app/css`));

app.use(cookieParser());

app.use('/api', apiRouter);

app.use('/', appRouter);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.listen(process.env.PORT || 8080);
