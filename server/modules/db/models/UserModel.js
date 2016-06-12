const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	userId: {
		type: String,
		unique: true
	},
	passwordHash: String,
	email: {
		type: String,
		unique: true
	}
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
