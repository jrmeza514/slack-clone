const ThreadsManager = require('./modules/db/ThreadsManager.js');
const UsersManager = require('./modules/db/UsersManager.js');
const AuthManager = require('./modules/auth/AuthManager.js');

let threadManager = new ThreadsManager();
let usersManager = new UsersManager();
let authManager = new AuthManager();

usersManager.registerUser('jrmeza', '30102514', 'jrmeza514@gmail.com' )
.then( user => {
	authManager.authorizeSession({
		userId: 'jrmeza',
		password: '30102514',
		email: 'jrmeza514@gmail.com'
	})
	.then(() => {
		console.log('Authorized!');
		usersManager.deleteUser('jrmeza');
	})
	.catch(( err ) => {
		console.log( err.message );
		usersManager.deleteUser('jrmeza');
	});
})
.catch( err => {
	console.error( err );
});
