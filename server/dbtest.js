const ThreadsManager = require('./modules/db/ThreadsManager.js');
const UsersManager = require('./modules/db/UsersManager.js');

let threadManager = new ThreadsManager();
let usersManager = new UsersManager();

threadManager.createThread('test-thread')
.then( thread => {
	usersManager.registerUser('fakeuser', 'faksepassword', 'fakeuser@fakeemail.com')
	.then( user => {
		Promise.all([
			thread.addMessage({
				userId: user.getUserId(),
				body: 'Fake Ass Message 1',
				timestamp: Date.now()
			}),
			thread.addMessage({
				userId: user.getUserId(),
				body: 'Fake Ass Message 2',
				timestamp: Date.now()
			}),
			thread.addMessage({
				userId: user.getUserId(),
				body: 'Fake Ass Message 3',
				timestamp: Date.now()
			}),
			thread.addMessage({
				userId: user.getUserId(),
				body: 'Fake Ass Message 4',
				timestamp: Date.now()
			}),
			thread.addMessage({
				userId: user.getUserId(),
				body: 'Fake Ass Message 5',
				timestamp: Date.now()
			})
		])
		.then( () => {
			threadManager.findThread( thread.getThreadId() )
			.then( thread => {
				usersManager.deleteUser( user.getUserId() );
				threadManager.deleteThread( thread.getThreadId() );
				console.log( thread );
			})
			.catch( err => {
				usersManager.deleteUser( user.getUserId() );
				threadManager.deleteThread( thread.getThreadId() );
				console.log( err.message );
			});
		})
		.catch( err => {
			usersManager.deleteUser( user.getUserId() );
			threadManager.deleteThread( thread.getThreadId() );
			console.log( err.message );
		});
	})
	.catch( err => {
		console.log( err.message );
		threadManager.deleteThread( thread.getThreadId() );
	});
})
.catch( err => {
	console.log( err.message );
});
