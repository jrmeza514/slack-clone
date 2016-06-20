const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use('/css', express.static(`${__dirname}/../../../app/css`));
router.use('/bower', express.static(
	`${__dirname}/../../../app/bower_components`));

function sessionManager(req, res, next) {
	let loggedIn = req.cookies.sessionToken;
	console.log(loggedIn);
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
	res.render('login');
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
