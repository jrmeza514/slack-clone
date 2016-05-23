const MongoClient = require('mongodb').MongoClient;


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

  addMember( memberId ){
  
  }

  addMessage( message ){

  }
}

module.exports = Thread;
