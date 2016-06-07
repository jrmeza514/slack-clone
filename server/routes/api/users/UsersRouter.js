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

const IDRouter = require('./IDRouter/IDRouter.js');
const router = express.Router();

router.use('/:userId', IDRouter );

router.route('/')
.get(( req, res ) => {
	usersManager.getAllUsers()
	.then( userList => {
		res.json({
			results: userList
		});
	})
	.catch( err => {
		res.json({
			results: null,
			message: 'Unable to retrieve any users'
		});
	});
});

module.exports = router;
