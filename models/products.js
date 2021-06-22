var mongoose = require('mongoose');

var ProuductSchema = new mongoose.Schema({
	name: {type:String, required:true, max:100},
	price: {type:String, required:true, max:100},
	description:{type:String, required:true, max:200},
})

module.exports = mongoose.model('Product',ProuductSchema);