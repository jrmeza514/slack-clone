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

/* Middleware that ensures that a user can only make request about themselves */
router.use((req, res, next) => {
	// Try to find user
	usersManager.findUser(req.params.userId)
		// User found
		.then(user => {
			// Try to get user sessions
			user.getActiveUserSessions()
				// sessions found
				.then(tokens => {
					tokens.forEach(token => {
						// User is Logged In
						if (token.sessionToken === req.cookies.sessionToken) {
							req.user = user;
							next();
						}
						// User is not Logged in
						else {
							res.json({
								results: null,
								message: 'Crendentials Invalid'
							})
						}
					});
				})
				// sessions not found
				.catch(err => {
					res.json({
						results: null,
						message: 'Unable to retrieve sessions'
					})
				});
		})
		// User Not Found
		.catch(err => {
			res.json({
				results: null,
				message: `No user ${userId} was found.`
			});
		});
});

router.route('/')
	.get((req, res) => {
		res.json({
			results: req.user
		});

	});

router.route('/sessions')
	.get((req, res) => {
		req.user.getActiveUserSessions()
			.then(sessions => {
				res.json({
					results: sessions
				});
			})
			.catch(err => {
				res.json({
					results: null,
					message: 'Unable to get sessions'
				});
			});
	});

module.exports = router;
