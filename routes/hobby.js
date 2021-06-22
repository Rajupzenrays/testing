var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb://localhost:27017';
var db;

/* GET users listing. */
router.get('/', function(req, res, next) {
		var resultString = "";

	mongoClient.connect(connectionString)
	.then(function(client){
		console.log("We are connected to database");
		db = client.db('zenrays');
		db.collection('courses').find().toArray()
		.then(function(results){
			console.log('Result = ');
			console.log( results);
			results.forEach(function(val){
				console.log('value = ');
				console.log(val);
				resultString = resultString+val.name+"<br>";
			})
				res.send(resultString);

		})






			})
  //res.send('I have a hobby of Music');
});
//connect to mongo 
//select database
//get the value from colletion
//send value back to browser

module.exports = router;
