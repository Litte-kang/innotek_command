var mongoose = require('mongoose');
var dbURL = 'mongodb://223.4.21.219/innotek_tobacco';

mongoose.connect(dbURL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
	console.log('Database connect succuess');
});

module.exports = mongoose;