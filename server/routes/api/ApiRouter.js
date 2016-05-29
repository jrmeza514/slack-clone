const express = require('express');
const ThreadsManager = require('../../modules/db/ThreadsManager.js');
const UsersManager = require('../../modules/db/UsersManager.js');

const usersManager = new UsersManager();
const threadsManager = new ThreadsManager();

let router = express.Router();

router.route('/')
.get(( req, res ) => {
	res.send('Welcome to the api!');
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


module.exports = router;