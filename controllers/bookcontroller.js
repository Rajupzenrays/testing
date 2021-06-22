var Razzu = require('../models/book');

exports.createBook = function(req,res,next){

	var bookOb = new Razzu({
		name:req.body.name,
		description:req.body.description
	})

	bookOb.save(function(err){
		if(err){
			console.log(err);
			res.json({error:"Book not saved"});
		}
		else{
			console.log("success");
			res.json({msg:"Book saved successfully"})
		}
	})
}

	exports.getBook = function(req,res,next){
		Razzu.find()
		.exec(function(err,book_list){
			res.json(book_list)
		})
}