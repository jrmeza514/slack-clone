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

const router = express.Router();
const IDRouter = require('./IDRouter/IDRouter.js');

router.use('/:threadId', IDRouter);
router.use(bodyParser.urlencoded({
	extended: false
}));
/* Get All Threads */
router.route('/')
	.get((req, res) => {
		threadsManager.getAllThreads()
			.then(threads => {
				res.json({
					results: threads
				});
			})
			.catch(err => {
				res.json({
					result: null,
					message: `No Threads Found.`
				});
			})
	});

router.route('/create')
	.post((req, res) => {

	});
module.exports = router;
