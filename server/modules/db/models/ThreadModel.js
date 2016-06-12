const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = Schema({
	threadId: {
		type: String,
		unique: true
	},
	messages: Array,
	members: Array
});

const ThreadModel = mongoose.model('Thread', ThreadSchema);
module.exports = ThreadModel;
