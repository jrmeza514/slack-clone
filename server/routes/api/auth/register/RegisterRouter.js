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

const router = express.Router();

router.use(bodyParser.urlencoded({
	extended: true
}));

router.route('/')
	.post((req, res) => {
		const userId = req.body.userId;
		const password = req.body.password;
		const password_verify = req.body.password_verify;
		const email = req.body.email;

		console.log(userId);
		// console.log(req.body);
		/* Ensure all needed parameters are included and passwords match */
		if (userId && password && password_verify && email) {
			if (password === password_verify) {
				usersManager.registerUser(userId, password, email)
					.then(user => {
						res.status(200);
						res.json(user);
					})
					.catch(err => {
						res.status(200);
						res.send('Error: User Creation Failed Try Again Later.');
					});
			} else {
				res.status(400);
				res.send('Passwords do not Match');
			}
			// TODO: Create User

		} else {
			res.status(200);
			res.json(req.body);
		}
	})

.get((req, res) => {
	res.status(200);
	res.json({
		message: 'Please Make A Post Request'
	});
});

module.exports = router;
