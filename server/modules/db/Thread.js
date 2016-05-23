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
}

module.exports = Thread;
