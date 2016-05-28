const express = require('express');
const ThreadsManager = require('../../modules/db/ThreadsManager.js');
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
			threads: threads
		});
	})
	.catch( err => {
		res.send("Nothing Found");
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
		res.json( thread );
	})
	.catch( err => {
		res.send(`Thread '${threadId}' does not exist: Please Check Spelling`);
	});
});


module.exports = router;
