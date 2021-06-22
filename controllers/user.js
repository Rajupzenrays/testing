var User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const jwt = require('jsonwebtoken');

exports.addUser = [
body('username').isLength({min:3}).trim().withMessage("Min 3 char"),
async function(req,res,next){
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({status:0, data:"validation failed", debug_data: errors.array()});

	}else{
		let user = await User.findOne({
			email:req.body.email
		});
		if(user){
			return res.status(400).json({
				msg:"User Already exist"
			});

		}
		const salt = await bcrypt.genSalt(10);
		let encryptedPassword = await bcrypt.hash(req.body.password, salt);
		var userOb = new User({
			username:req.body.username,
			email: req.body.email,
			password:encryptedPassword,
		});
		userOb.save(function(err){
			if(err){
				res.json({status:0,debug_data:err});
			}else{
				res.json({status:1,data:"user saved successfully"});
			}
		})
	}
}
] 



exports.login = [
body('email').isLength({min:3}).trim().withMessage("Min 3 char"),
async function (req,res,next){
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({status:0, data:"validation failed",debug_data: errors.array()});

	}else {
		const { email,password } =req.body;
		let user = await User.findOne({
			email:req.body.email
		});
		if (!user)
			return res.status(400).json({
				message: "User Not Exist"
			});
		//i am encrypting password with bcrypt to convert it into hash(means encrypted)
		const passCorrect = await bcrypt.compare(password, user.password);
		if(!passCorrect)
			return res.status(400).json({
				message: " Password wrong"
			});
		// i need to send JWT token and also information about the user like his user id and email.
		// if the password is correct then we create a jwt token
		// payload is the data that is send inside the token to the user
		const payload = {
			user: {
				id: user.id,
				email:email
			}
		};
		// i am creating a jwt token to send to the front end to let user login
		//As long as user has the token he can login into the website
		// user normally stores token either in cookie(old way) or in local storage(for react/angular/spa apps)
		// the user will send this token everytime to the server to verify. If he is not sending token he is not sending token he is not consider 
		// logged in and con not access secure area of website

		jwt.sign(
			payload,
			"secretString",
			{
				// time till the token will remain avtive. after that token will expire
				expiresIn:1200
			},
			(err, token)=>{
				if (err) throw err;
				res.status(200).json({
					token
				});
			}
			);
	}
}]

exports.restrictedPage = [
auth,
async (req,res)=>{
	// req.email and req.id .they are added by the middleware so that you dont have ag
	// token add do these task
	res.json({ data:" You can access details"})
}]