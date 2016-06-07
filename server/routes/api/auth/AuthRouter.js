const express = require('express');
const bodyParser = require('body-parser');

/* Load custom modules */
const ThreadsManager = require('../../../modules/db/ThreadsManager.js');
const UsersManager = require('../../../modules/db/UsersManager.js');
const AuthManager = require('../../../modules/auth/AuthManager.js');

/* Local Variables */
const usersManager = new UsersManager();
const threadsManager = new ThreadsManager();
const authManager = new AuthManager();

const LoginRouter = require('./login/LoginRouter.js');
const RegisterRouter = require('./register/RegisterRouter.js');

const router = express.Router();

router.use('/login', LoginRouter);
router.use('/register', RegisterRouter);

router.route('/')
	.get((req, res) => {
		res.status(200);
		res.json({
			message: 'Pleae Make a Post Request'
		});
	});

module.exports = router;
