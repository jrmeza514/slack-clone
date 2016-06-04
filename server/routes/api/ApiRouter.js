const express = require('express');
const ThreadsManager = require('../../modules/db/ThreadsManager.js');
const UsersManager = require('../../modules/db/UsersManager.js');
const AuthManager = require('../../modules/auth/AuthManager.js');

const bodyParser = require('body-parser');

const usersManager = new UsersManager();
const threadsManager = new ThreadsManager();
const authManager = new AuthManager();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let router = express.Router();

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
/*
	GET ALL THREADS
*/
router.route('/threads')
.get(( req, res ) => {
	threadsManager.getAllThreads()
	.then( threads => {
		res.json({
			results: threads
		});
	})
	.catch( err => {
		res.json({
			result: null,
			message: `No Threads Found.`
		});
	})
});
/*
	GET THREAD BY ID
*/
router.route('/threads/:threadId')
.get(( req, res ) => {
	let threadId = req.params.threadId;
	threadsManager.findThread( threadId )
	.then( thread => {
		res.json({
			results: thread
		});
	})
	.catch( err => {
		res.json({
			results: null,
			message: `Nothing found for ${threadId}`
		});
	});
});
/*
	Get All Users
*/

router.route('/users')
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
router.route('/users/:userId')
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

/*
	Auth User
*/
// TODO: Figure out how to get POST data
router.route('/login')
.post( bodyParser.urlencoded({ extended: true }) , ( req, res ) => {
	let userId = req.body.userId;
	let password = req.body.password;

	if ( userId && password ) {
		authManager.authorizeSession({ userId, password })
		.then(() => {
			res.status( 200 );
			/*
				The Crendentials have been Successfully validated but
				we are still sending random garbage as a response.
				This should return a sessionToken
			*/
			res.json({
				sessionToken: '72y3rbc3ygb273r62b38xnn'
			});
		})
		.catch( err => {
			res.status(400);
			res.send('Crendentials Invalid!');
		});
	}
	else {
		res.status(400);
		res.send('Invalid Request: Include userId and password.');
	}
});


router.route('/register')
.post( bodyParser.urlencoded({ extended: true }) , ( req , res ) => {
	let userId = req.body.userId;
	let password = req.body.password;
	let password_verify = req.body.password_verify;
	let email = req.body.email;

	/* Ensure all needed parameters are included and passwords match */
	if ( userId && password && password_verify && email && password === password_verify ) {
		// TODO: Create User
		usersManager.registerUser( userId, password, email )
		.then( user => {
			res.status( 200 );

			res.json( user );
		})
		.catch( err => {
			res.status( 400 );
			res.send('Error: User Creation Failed Try Again Later.');
		});
	}
	else {
		res.status(400);
		res.send('Invalid Request: Include userId, password, password_verify and email');
	}
});
module.exports = router;
