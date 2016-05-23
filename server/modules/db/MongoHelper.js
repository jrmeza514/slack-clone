const MongoClient = require('mongodb').MongoClient;
const ThreadsManager = require('./ThreadsManager.js');

const MONGODB_URL = "mongodb://localhost:27017/slack-clone";

// var connection = MongoClient.connect( MONGODB_URL );
// connection.then( db => {
//   var collection = db.collection('threads');
//   collection.find().toArray().then( threads => {
//     threads.forEach( thread => {
//       console.log( thread );
//     });
//     db.close();
//   }).catch( err  => {
//     db.close();
//     console.error( err );
//   });
//
// }).catch( err => {
//   console.error( err );
// });

class MongoHelper{
  constructor( DBURL ){

  }
}

module.exports = MongoHelper;
