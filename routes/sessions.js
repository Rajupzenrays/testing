var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  req.session.name = "zenrays.com";

  req.session.location = "Banglore";
  res.send("session set")
});
router.get('/showsession',function(req,res, next){
	res.send(

		`the value of the name is ${req.session.name} and location is ${req.session.location}`);

});

// equivalent to logout in session terminology
router.get('/clear', function(req,res,next){
	req.session.destroy(function(err){
		console.log(err);
		res.send("session destroyed")
	})
});


// delete the session
router.get("/deletelocationsession",function(req,res,next){
	if(req.session.location){
		delete req.session.location;
		res.send("deleted location session variable");

	}else{
		res.send("failed")
	}
});

module.exports = router;
