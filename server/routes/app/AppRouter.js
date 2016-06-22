const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const AuthManager = require('../../modules/auth/AuthManager');
const authManager = new AuthManager();
const UsersManager = require('../../modules/db/UsersManager');
const usersManager = new UsersManager();

const router = express.Router();

router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(cookieParser());
router.use('/css', express.static(`${__dirname}/../../../app/css`));
router.use('/bower', express.static(
	`${__dirname}/../../../app/bower_components`));

function sessionManager(req, res, next) {
	console.log(req);
	let loggedIn = false;

	let sessionToken = req.cookies.sessionToken;
	let userId = req.cookies.userId;
	let sessionExpires = parseInt(req.cookies.sessionExpires);
	let timestamp = Date.now();

	console.log(sessionExpires > timestamp);
	if (sessionToken)
		loggedIn = true;

	if (sessionExpires < timestamp)
		res.redirect('/logout');

	if (loggedIn)
		next();
	else
		res.redirect('/login');
}

router.use('/dashboard', sessionManager);

router.get('/', (req, res) => {
	res.redirect('/dashboard');
});

router.get('/login', (req, res) => {
	if (!req.cookies.sessionToken)
		res.render('login');
	else
		res.redirect('/');
});

});

router.get('/register', (req, res) => {
	res.render('register');
});

router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

router.get('/logout', (req, res) => {
	res.clearCookie('sessionToken');
	res.clearCookie('sessionExpires');
	res.clearCookie('sessionTimestamp');
	res.redirect('/');
});

module.exports = router;
