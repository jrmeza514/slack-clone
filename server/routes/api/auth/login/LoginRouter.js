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

router.route('/')
/* Handle Post Request for the Login Endpoint */
.post( bodyParser.urlencoded({ extended: true }) , ( req, res ) => {
	let userId = req.body.userId;
	let password = req.body.password;

	if ( userId && password ) {
		authManager.authorizeSession({ userId, password })
		.then(( session ) => {
			res.status( 200 );
			res.json({
				session
			});
		})
		.catch( err => {
			res.status(400);
			res.send('Crendentials Invalid!');
		});
	} else {
		res.status(400);
		res.send('Invalid Request: Include userId and password.');
	}
})
/* Hadle Get Request for Login Endpoint */
.get(( req , res ) => {
	res.status( 200 );
	res.json({ message: 'Please Make A Post Request'});
});

module.exports = router;
