var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorcontroller');
var bookController = require('../controllers/bookcontroller');
var userController = require('../controllers/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Learning by Zenrays', confused: 'Avinash and eshan are!' });
});

router.get('/login', function(req,res, next){
	res.send(`<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<form action="/makelogin" method="GET">
		<input type="text" name="username" />
		<input type="password" name="password" />
		<button> login</button>
	</form>

</body>
</html>`);
});

router.get('/makelogin', function(req,res,next){
	console.log(req.query);
	if(req.query.username == "sumit"){
		req.session.loggedIn = true;
		req.session.userDetails = {
			username: req.query.username,
			email: "someemail",
		};
		res.send("you are loggedin")
	}else{
		res.send("invalid credential")
	}
});

router.get('/userarea', function(req, res, next){
	console.log(req.session.username);
	console.log(req.session.loggedIn);
	if (req.session.loggedIn) {
		res.send("you are loggedin and your email is "+ req.session.userDetails.email);

	}else {
		res.send("not loggedin")
	}
})


// 

router.get('/pancard',function(req,res,next){
	 res.json({pan:123}) ;
})
router.get('/income/:pan',function(req,res,next){
	 if(req.params.pan == 123){
	 	res.json({income:400000})
	 } else {
	 	res.json({error:"not valid pan"})
	 }
})



/*router.post('/author', function(req, res, next) {
  res.render('index', { title: 'chill', confused: 'chillax' });
});*/
console.log(authorController);
//on calling the /author route, the function present in controllers/authorcontroller will be called. 
//post is like get. with post we can send data which is the author details. look at the swagger url.
router.post('/author',authorController.createAuthor);
router.get('/author',authorController.getAuthors);
router.post('/book',bookController.createBook);
router.get('/author/:id',authorController.getAuthorDetails);
router.delete('/author/:id',authorController.deleteAuthor);

router.get('/restrictedPage', userController.restrictedPage);
router.post('/register', userController.addUser);
router.get('/login',userController.login)
module.exports = router;