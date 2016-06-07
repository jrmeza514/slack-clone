const express = require('express');
const bodyParser = require('body-parser');

/* Load custom modules */
const ThreadsManager = require('../../../../modules/db/ThreadsManager.js');
const UsersManager = require('../../../../modules/db/UsersManager.js');
const AuthManager = require('../../../../modules/auth/AuthManager.js');

/* Local Variables */
const usersManager = new UsersManager();
const threadsManager = new ThreadsManager();
const authManager = new AuthManager();

const router = express.Router({
	mergeParams: true
});

router.route('/')
	.get((req, res) => {
		let threadId = req.params.threadId;
		threadsManager.findThread(threadId)
			.then(thread => {
				res.json({
					results: thread
				});
			})
			.catch(err => {
				res.json({
					results: null,
					message: `Nothing found for ${threadId}`
				});
			});
	});

module.exports = router;
