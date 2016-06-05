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
const IDRouter = express.Router({ mergeParams: true });

router.use('/:userId', IDRouter );

/* Get All Users */
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
			message: `Unable to retrieve any users`
		});
	});
});

/*
	Get All UserById
*/
IDRouter.route('/')
.get(( req, res ) => {
	let userId = req.params.userId;
	usersManager.findUser( userId )
	.then( user => {
		res.json({
			results: user
		});
	})
	.catch( err => {
		res.json({
			results: null,
			message: `No user ${userId} was found.`
		});
	});

});

IDRouter.route('/sessions')
.get(( req, res ) => {
	let userId = req.params.userId;
	usersManager.findUser( userId )
	.then((user) => {
		user.getActiveUserSessions()
		.then((sessions) => {
			res.status( 200 );
			res.json({ sessions })
		})
		.catch((err) => {
			res.status( 400 );
			res.send("Error: Unable To Get Sessions");
		});
	})
	.catch((err) => {
		res.status( 400 );
		res.send("Error: user not found");
	});
});
module.exports = router;
