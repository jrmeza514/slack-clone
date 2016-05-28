const express = require('express');
const ThreadsManager = require('../../modules/db/ThreadsManager.js');
const threadsManager = new ThreadsManager();

let router = express.Router();

router.route('/')
.get(( req, res ) => {
	res.send('Welcome to the api!');
});

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
