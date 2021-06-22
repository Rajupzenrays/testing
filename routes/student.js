var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var db;

/* GET users listing. */
router.get('/', function(req, res, next) {
 
      var connectionString = 'mongodb://localhost:27017/zenrays';
mongoClient.connect(connectionString)
//if it is successful then run the functon below
.then(function(client){
	//this line selects the database zenrays.
	db = client.db("zenrays");
	//gets data from collection students. on success it runs the function inside them
	db.collection("students").find().toArray()
	.then(function(results){
		console.log(results);
		//if u want to send json
		res.json(results);
		var resultStr = "";
		results.forEach(function(val){
			resultStr = resultStr+val.name+"<br>";
		})
		//res.send(resultStr);
	})
	console.log("connected to MongoDB");
	

})
//if there is an error then run the function below
.catch(function(error){
	console.log('error in connection'+error);
})
});

module.exports = router;