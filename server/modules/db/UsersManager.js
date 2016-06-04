const bcrypt = require('bcrypt-nodejs');

const MongoClient = require('mongodb').MongoClient;
const User = require('./User.js');

const MONGODB_URL = "mongodb://localhost:27017/slack-clone";
const USERS_COLLECTION = "users";

class UsersManager {
  constructor() {

  }

  registerUser( userId, password, email ){
    let passwordHash = bcrypt.hashSync( password );

    return new Promise((resolve, reject) => {
      MongoClient.connect( MONGODB_URL )
      /* Database Connection successful */
      .then( db => {
        let usersCollection = db.collection( USERS_COLLECTION );

        usersCollection.insert({ userId: userId, passwordHash: passwordHash, email: email , sessions: []})
        /*  User Insertion successful */
        .then( result => {
          db.close();
          resolve( new User( result.ops[0] ) );
        })
        /* User Insertion failed */
        .catch( err => {
          db.close();
          reject( err );
        })

      })
      /* Database Connection failed */
      .catch( err => {
        reject( err );
      });
    });
  }

  deleteUser( userId ){
    return new Promise(( resolve, reject ) => {
      MongoClient.connect( MONGODB_URL )
      /* Database Connection successful */
      .then( db => {
        let usersCollection = db.collection( USERS_COLLECTION );

        usersCollection.remove({userId: userId})
        /* User Deletion successful */
        .then( () => {
          db.close();
          resolve();
        })
        /* User Deletion Failed */
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

  findUser( userId ){
    return new Promise(( resolve, reject ) => {
      MongoClient.connect( MONGODB_URL )
      /* Database connect successful */
      .then( db => {
        let usersCollection = db.collection( USERS_COLLECTION );

        usersCollection.find({ userId: userId}).toArray()
        /* Found User */
        .then( users => {
          db.close();
          resolve( new User(users[0]) );
        })
        /* User Not Found */
        .catch( err => {
          db.close();
          reject( err );
        });
      })
      /* Database Connection Failed */
      .catch( err => {
        reject( err );
      });
    });
  }

	getAllUsers(){
		return new Promise(( resolve, reject ) => {
			MongoClient.connect( MONGODB_URL )
			.then( db => {
				let usersCollection = db.collection( USERS_COLLECTION );
				usersCollection.find({}).toArray()
				.then( userList => {
					db.close();
					resolve( userList );
				})
				.catch( err => {
					db.close();
					reject( err );
				});
			})
			.catch( err => {
				reject( err );
			});
		});
	}
}

module.exports = UsersManager;
