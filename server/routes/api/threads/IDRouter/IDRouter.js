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

router.use((req, res, next) => {
	let threadId = req.params.threadId;
	// Try to find thread
	threadsManager.findThread(threadId)
		// thread found
		.then(thread => {
			req.thread = thread;
			next();
		})
		// thread not found
		.catch(err => {
			res.json({
				results: null,
				message: `Nothing found for ${threadId}`
			});
		});
});

router.route('/')
	.get((req, res) => {
		res.json({
			results: req.thread
		})
	});

router.route('/members')
	.get((req, res) => {
		req.thread.updateContents()
			.then(() => {
				res.json({
					results: req.thread.getMembers()
				});
			})
			.catch(err => {
				res.json({
					results: req.thread.getMembers()
				})
			});
	});

module.exports = router;
