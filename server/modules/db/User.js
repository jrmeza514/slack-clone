const MongoClient = require('mongodb')
	.MongoClient;
const USERS_COLLECTION = "users";
const MONGODB_URL = "mongodb://localhost:27017/slack-clone";

class User {
	constructor(user) {
		this.passwordHash = user.passwordHash;
		this.userId = user.userId;
		this.email = user.email;
	}

	getUserId() {
		return this.userId;
	}

	getPasswordHash() {
		return this.passwordHash;
	}

	getEmail() {
		return this.email;
	}

	getActiveUserSessions() {
		let self = this;
		return new Promise((resolve, reject) => {
			MongoClient.connect(MONGODB_URL)
				.then(db => {
					let usersCollection = db.collection(USERS_COLLECTION);

					usersCollection.find({
							'userId': self.getUserId()
						}, {
							'sessions': true
						})
						.toArray()
						.then((data) => {
							db.close();
							resolve(data[0].sessions);
						})
						.catch((err) => {
							db.close();
							reject(new Error('No Users Found'));
						});
				})
				.catch((err) => {
					reject(new Error('Database Connection Failed'));
				});

		});
	}

	addActiveSession(session) {
		let self = this;
		return new Promise((resolve, reject) => {
			MongoClient.connect(MONGODB_URL)
				.then((db) => {
					let usersCollection = db.collection(USERS_COLLECTION);

					usersCollection.update({
						userId: self.getUserId()
					}, {
						$push: {
							sessions: session
						}
					})

					.then(results => {
							db.close();
							resolve(session);
						})
						.catch((err) => {
							db.close();
							reject(new Error('Unable To Create Session'));
						});
				})
				.catch((err) => {
					reject(new Error('Database Connection Failed'));
				});
		});
	}

	removeActiveSession(sessionToken) {
		let self = this;
		return new Promise((resolve, reject) => {
			MongoClient.connect(MONGODB_URL)
				.then(db => {
					let usersCollection = db.collection(USERS_COLLECTION);

					usersCollection.update({
							userId: self.getUserId()
						}, {
							$pull: {
								sessions: {
									sessionToken: sessionToken
								}
							}
						})
						.then(results => {
							db.close();
							resolve(results);
						})
						.catch(err => {
							db.close()
							reject(new Error('Unable to update'))
						})
				})
				.catch(err => {
					reject(new Error('Database Connection Failed'));
				})
		});
	}
}

module.exports = User;
