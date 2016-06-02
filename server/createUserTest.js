const ThreadsManager = require('./modules/db/ThreadsManager.js');
const UsersManager = require('./modules/db/UsersManager.js');
const AuthManager = require('./modules/auth/AuthManager.js');

let threadManager = new ThreadsManager();
let usersManager = new UsersManager();
let authManager = new AuthManager();

usersManager.registerUser('jrmeza514', '30102514', 'jrmeza514@gmail.com')
.then(( user ) => {
	console.log('User Registered');
})
.catch( err => {
	console.log('User Not Registered');
});
