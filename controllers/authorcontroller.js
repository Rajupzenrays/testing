var Author = require('../models/author');
// var firstname = "eshan";
// var lastname = "shrivastava";
// var dob = "12-02-1950";
// var dod = "1-03-1995";
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
exports.getAuthors = function(req,res,next){
	Author.find()
	.exec(function(err,authors_list){
		res.json(authors_list);
	});
}
exports.createAuthor = [
  body('first_name').isLength({min:1}).trim().withMessage("first name needed")
  .isAlphanumeric().withMessage("first name should be alpha numeric"),

  body('last_name').isLength({min:1}).trim().withMessage("last name needed")
  .isAlphanumeric().withMessage("last name should be alpha numeric"),

  body('dob').isISO8601().withMessage("Data format for DOB improper")
  .optional({checkFalsy:true}),

  body('dod').isISO8601().withMessage("Data format for DOD improper")
  .optional({checkFalsy:true}),
  
  function(req,res,next){
  	const errors = validationResult(req);
  	if(!errors.isEmpty()){
  		res.json({status:0,data:"validation failed", debug_data:errors.array()});
  	} 

  	else{
  		var authorOb = new Author({
  			first_name:req.body.first_name,
  			last_name:req.body.last_name,
  			dob:req.body.dob,
  			dod:req.body.dod,
  		    country:req.body.country
  		});
  		authorOb.save(function(err){
  			if(err){
  				res.json({status:0});
  			}
  			else{
  				res.json({status:1, data:"Author saved Successfully"});
  			}
  		})
  	}
  }

]



//we are creating a create author functionn which will run when we fire 
//the post route this will be used by routes/index.js file.
// exports.createAuthor = function(req,res,next){
//      console.log(req);

// 	var authorOb = new Author({
// 		first_name:req.body.first_name,
// 		last_name:req.body.last_name,
// 		dob:req.body.dob,
// 		dod:req.body.dod,
// 	});
// 	authorOb.save(function(err){
// 		if (err) {
// 			console.log(err);
// 			res.json({error:"cant save"});
// 		}
// 		else {
// 			console.log('success');
// 			res.json({msg:"author saved"});
// 		}
// 	})
// }

exports.getAuthors = function(req,res,next){
	Author.find()
	.exec(function(err, author_list){
		res.json(author_list);
	})
}

exports.getAuthorDetails = function(req,res,next){
	console.log("Came in getAuthorDetails");
	console.log(req.params);
	Author.findById(req.params.id)
	.exec(function(err,author_details){
		res.json(author_details);
	})
}

exports.deleteAuthor = function(req,res,next){
	console.log("Came in getAuthorDetails");
	console.log(req.params);
	Author.findById(req.params.id).remove()
	.exec(function(){
		res.json({msg:"Author deleted"});
	})
}