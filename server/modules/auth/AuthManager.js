const express = require('express');
const bcrypt = require('bcrypt-nodejs');

const UsersManager = require('../db/UsersManager.js');
const usersManager = new UsersManager();

class AuthManager {

	authorizeSession( unauthorizedUser ){
		return new Promise(( resolve, reject ) => {
			usersManager.findUser( unauthorizedUser.userId )
			.then( user => {
				let unauthHash = bcrypt.hashSync( unauthorizedUser.password );
				let passwordMatch = bcrypt.compareSync( unauthorizedUser.password , user.passwordHash );
				if ( passwordMatch ) {
					resolve();
				}
				else {
					reject( new Error('Pass Does Not Match'));
				}
			})
			.catch( err => {
				reject(new Error('User Does Not Exist!'));
			});
		});
	}
}

module.exports = AuthManager;
