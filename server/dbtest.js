const MONGODB_URL = "mongodb://localhost:27017/slack-clone";

const ThreadsManager = require('./modules/db/ThreadsManager.js');

var threadManager = new ThreadsManager( MONGODB_URL );

var pr = threadManager.createThread('fake-thread').then( ( thread ) => {
  console.log( thread );

  threadManager.findThread( thread.getThreadId() )
  .then( t => {
    console.log( t );
    threadManager.deleteThread( t.getThreadId() )
    .then( () => {
      console.log("Eureka: No More fake threads");
    })
    .catch( err => {
      console.error( err );
    });
  })
  .catch( err => {
    console.error( err );
  });

}).catch( err => {
  console.error( err );
})
