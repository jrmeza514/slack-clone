const MongoClient = require('mongodb').MongoClient;
const User = require('./User.js');
const UsersManager = require('./UsersManager.js');

const THREADS_COLLECTION = "threads";
const MONGODB_URL = "mongodb://localhost:27017/slack-clone";

class Thread {
	constructor( thread ) {
		this.threadId = thread.threadId;
		this.messages = thread.messages;
		this.members = thread.members;
	}

	getThreadId(){
		return this.threadId;
	}

	getMessages(){
		return this.messages;
	}

	getMembers(){
		return this.members;
	}

	/*
		This method should return a promise that will either:
			- resolve if the user is Successfully added to the Thread
			- reject if the usser Fails to join the thread

		Requirements: User must already Exist
	*/
	addMember( memberId ){
		let self = this;
		return new Promise(( resolve, reject ) => {
			let usersManager = new UsersManager();
			/* Search if user Exists */
			usersManager.findUser( memberId )
			/* User Found */
			.then( user => {
				MongoClient.connect( MONGODB_URL )
				/* Database Connection successful */
				.then( db => {
					let threadsCollection = db.collection( THREADS_COLLECTION );
					/* Update the Thread's members field to push a new member */
					threadsCollection.update(
						{ threadId: self.getThreadId() },
						{ $push: { members : memberId }}
					)
					/* Successfully Updated Thread */
					.then( result => {
						db.close();
						resolve();
					})
					/* Failed To Update Thread:  */
					.catch( err => {
						db.close();
						reject( new Error("User Already Exists") );
					});
				})
				/* Database Connection Failed */
				.catch( err => {
					reject( new Error("Database Connection Failed") );
				});
			})
			/* User Not Found */
			.catch( err => {
				reject( new Error("User Does Not Exist") );
			});
		});
	}

	/*
		This method should return a Promise that will:
			- resolve: if the message is Successfully added
			- reject: if the message is not Successfully Added

		Requirements:
	*/
	addMessage( message ){
		let self = this;
		return new Promise((resolve, reject) => {
			if ( !message.userId || !message.body || !message.timestamp ) {
				reject( new Error('Message Not Valid') );
			}
			let usersManager = new UsersManager();
			/* Check if the user Exists */
			usersManager.findUser( message.userId )
			/* User Does Exist */
			.then( user => {
				MongoClient.connect( MONGODB_URL)
					/* Database Connection successful */
				.then( db => {
					let threadsCollection = db.collection( THREADS_COLLECTION );
					threadsCollection.update(
						{ threadId: self.getThreadId() },
						{ $push: { messages: message }}
					)
					/* Successfully Updated Thread */
					.then( result => {
						db.close();
						resolve();
					})
					/* Failed To Update Thread:  */
					.catch( err => {
						db.close();
						reject( new Error(" Could Not Add Message") );
					});
				})
				/* Database connect failed */
				.catch( err => {
					reject(new Error('Could Not Connect To the Database'));
				});
			})
			/* User Does Not Exist */
			.catch( err => {
				reject( new Error('User Does Not Exist'));
			});
		});
	}
}

module.exports = Thread;
