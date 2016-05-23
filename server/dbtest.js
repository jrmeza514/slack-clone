const ThreadsManager = require('./modules/db/ThreadsManager.js');
const UsersManager = require('./modules/db/UsersManager.js');

let threadManager = new ThreadsManager();
let usersManager = new UsersManager();

usersManager.registerUser('jrmeza514', '30102514', 'jrmeza514@gmail.com')
.then( user => {
  console.log( user );
  usersManager.deleteUser( user.getUserId() )
  .then( () => {
    console.log(`Deleted Annoying user: ${user.getUserId()}`);
  })
  .catch( err => {
    console.log( err );
  })
})

.catch( err => {
  console.log( err );
});


threadManager.createThread('fake-thread')
.then( ( thread ) => {
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
