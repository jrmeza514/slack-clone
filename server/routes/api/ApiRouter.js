const express = require('express');
const bodyParser = require('body-parser');

/* Load Modules */
const ThreadsManager = require('../../modules/db/ThreadsManager.js');
const UsersManager = require('../../modules/db/UsersManager.js');
const AuthManager = require('../../modules/auth/AuthManager.js');

const AuthRouter = require('./auth/AuthRouter.js');
const UsersRouter = require('./users/UsersRouter.js');
const ThreadsRouter = require('./threads/ThreadsRouter.js');


/* Local Variables */
const usersManager = new UsersManager();
const threadsManager = new ThreadsManager();
const authManager = new AuthManager();

const router = express.Router();

router.use('/auth', AuthRouter );
router.use('/users', UsersRouter );
router.use('/threads', ThreadsRouter );

/********************************************************************************
	API HOMEPAGE
********************************************************************************/
router.route('/')
.get(( req, res ) => {
	res.json({
		message: 'Welcome to the API. Please Make a request to one of the following endpoints:',
		endpoints: [
			'/api/users',
			'/api/users/:userId',
			'/api/threads',
			'/api/threads/:threadId'
		]
	});
});

module.exports = router;
