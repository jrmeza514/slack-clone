let ThreadsManager = require('./ThreadsManager.js');
let threadsManager = new ThreadsManager();

let prom = threadsManager.findThread('fake');

prom.then(thread => {
		console.log(thread);
	})
	.catch((err) => {
		console.log(err);
	})
