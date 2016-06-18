const express = require('express');
const bcrypt = require('bcrypt-nodejs');

const UsersManager = require('../db/UsersManager.js');
const usersManager = new UsersManager();
const _24_HOURS_IN_SECS = 172800;
class AuthManager {

	authorizeSession(unauthorizedUser) {
		return new Promise((resolve, reject) => {
			usersManager.findUser(unauthorizedUser.userId)
				.then(user => {
					let unauthHash = bcrypt.hashSync(unauthorizedUser.password);
					let passwordMatch = bcrypt.compareSync(unauthorizedUser.password, user
						.passwordHash);
					if (passwordMatch) {

						let sessionToken = bcrypt.hashSync(Math.random()
							.toString());
						let timestamp = Date.now();
						let expires = timestamp + _24_HOURS_IN_SECS;
						let session = {
							sessionToken, timestamp, expires
						};

						user.addActiveSession(session)
							.then((sess) => {
								resolve(sess);
								console.log(sess);
							})
							.catch((err) => {
								reject(err);
							});

					} else {
						reject(new Error('Pass Does Not Match'));
					}
				})
				.catch(err => {
					reject(new Error('User Does Not Exist!'));
				});
		});
	}

}

module.exports = AuthManager;
