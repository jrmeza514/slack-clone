const Thread = require('./ThreadModel');
const User = require('./UserModel');
const DBURL = 'mongodb://localhost:27017/slack-clone';
const mongoose = require('mongoose');

mongoose.connect(DBURL);

const db = mongoose.connection;

db.on('error', err => {

});

db.once('open', () => {
	const sampleUser = new User({
		userId: 'jrmeza514',
		passwordHash: 'asdasd',
		email: 'jrmeza514@gmail.com'
	});

	sampleUser.save(err => {
		if (err) {
			console.error(err);
			return;
		}

		db.close();
	});

});
