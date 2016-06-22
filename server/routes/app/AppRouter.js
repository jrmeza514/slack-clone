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

router.post('/login', (req, res) => {
	let userId = req.body.userId;
	let password = req.body.password;

	if (userId && password) {
		authManager.authorizeSession({
				userId, password
			})
			.then(session => {
				res.cookie('userId', userId);
				res.cookie('sessionToken', session.sessionToken);
				res.cookie('sessionTimestamp', session.timestamp);
				res.cookie('sessionExpires', session.expires);
				res.redirect('/');
			})
			.catch((err) => {
				res.redirect('/');
			})
	} else {
		res.redirect('/');
	}
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	const userId = req.body.userId;
	const password = req.body.password;
	const password_verify = req.body.password_verify;
	const email = req.body.email;


	/* Ensure all needed parameters are included and passwords match */
	if (userId && password && password_verify && email) {
		if (password === password_verify) {
			usersManager.registerUser(userId, password, email)
				.then(user => {
					res.redirect('login');
				})
				.catch(err => {
					console.log('err');
					res.redirect('register');
				});
		} else {
			res.redirect('register')
			console.log('passwords do not match');
		}
	} else {
		console.log('Include All');
		res.redirect('register');
	}
});

router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});

router.get('/logout', (req, res) => {
	let userId = req.cookies.userId;
	let sessionToken = req.cookies.sessionToken;

	if (userId && sessionToken) {
		usersManager.findUser(userId)
			.then(user => {
				user.removeActiveSession(sessionToken);
			});
	}



	res.clearCookie('sessionToken');
	res.clearCookie('sessionExpires');
	res.clearCookie('sessionTimestamp');
	res.redirect('/');
});

module.exports = router;
