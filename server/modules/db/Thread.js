const MongoClient = require('mongodb').MongoClient;
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

  // TODO: This thread add a even if he does not exist
  // Chech user before adding to the thread
  addMember( memberId ){
    let self = this;
    return new Promise(( resolve, reject ) => {
      let usersManager = new UsersManager();
      usersManager.findUser( memberId )
      /* User Found */
      .then( user => {
        MongoClient.connect( MONGODB_URL )
        /* Database Connection successful */
        .then( db => {
          let threadsCollection = db.collection( THREADS_COLLECTION );

          threadsCollection.update(
            { threadId: self.getThreadId() },
            { $push: { members : memberId }}
          )
          .then( result => {
            db.close();
            resolve();
          })
          .catch( err => {
            db.close();
            reject( new Error('User Already Exists') );
          });
        })
        /* Database Connection Failed */
        .catch( err => {
          reject( err );
        });
      })
      .catch( err => {
        reject("User Does Not Exist");
      });
    });
  }

  addMessage( message ){

  }
}

module.exports = Thread;
