var Product = require('../models/products');
var name = "Eshan";
var price = 2000;
var description = "I am from description";

exports.createProduct = function(req,res,next){
     console.log(req);

	var productOb = new Product({
		name:req.body.name,
		price:req.body.price,
		description:req.body.description
	});
	productOb.save(function(err){
		if (err) {
			console.log(err);
			res.json({error:"cant save"});
		}
		else {
			console.log('success');
			res.json({msg:"product saved"});
		}
	})
}
exports.getProduct = function(req,res, next){
	Product.find()
	.exec(function(err,product_list){
		res.json(product_list);
	})
}