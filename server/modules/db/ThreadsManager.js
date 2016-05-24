const MongoClient = require('mongodb').MongoClient;

const Thread = require('./Thread.js');
const THREADS_COLLECTION = "threads";

const MONGODB_URL = "mongodb://localhost:27017/slack-clone";

class ThreadsManager {
	constructor(){}
	createThread( threadId ){
		return new Promise(( resolve, reject ) => {
			MongoClient.connect( MONGODB_URL )
			/* Database Connection successful */
			.then(( db ) => {
				/* Select The Threads collection */
				let threadsCollection = db.collection(THREADS_COLLECTION);
				/* Attempt to insert the new thread. This will return a Promise */
				threadsCollection.insert({
					"threadId": threadId,
					"messages": [],
					"members": []
				})
				/* Insertion successful */
				.then( result => {
					resolve( new Thread( result.ops[0]) );
					db.close();
				})
				/* Insertion Failed: Close db and reject Promise */
				.catch( err => {
					db.close();
					reject( err );
				});
			})
			/* Database Connection Failed: reject the promise */
			.catch( err => {
				reject( err );
			});
		});
	}

	deleteThread( threadId ){
		return new Promise(( resolve, reject ) => {
			MongoClient.connect( MONGODB_URL )
			/* Database Connection successful */
			.then( db => {
				let threadsCollection = db.collection( THREADS_COLLECTION );
				threadsCollection.remove({"threadId": threadId})
				/* Thread Deletion successful */
				.then( () => {
					db.close();
					resolve();
				})
				/* Thread Deletion Failed  */
				.catch( err => {
					db.close();
					reject( err );
				})
			})
			/* Database connection failed */
			.catch( err => {
				reject( err );
			});
		});
	}

	findThread( threadId ){
		return new Promise(( resolve, reject ) => {
			MongoClient.connect( MONGODB_URL )
			/* Database Connection successful */
			.then( db => {
				let threadsCollection = db.collection( THREADS_COLLECTION );
				threadsCollection.find({"threadId": threadId}).toArray()
				/* Found Thread */
				.then( thread => {
					db.close();
					resolve( new Thread( thread[0] ) );
				})
				/* Found Nothing */
				.catch( err => {
					db.close();
					reject( err );
				})
			})
			/* Database Connection Failed */
			.catch( err => {
				reject( err );
			});
		});
	}
}

module.exports = ThreadsManager;
