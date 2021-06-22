var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	name:{type:String},
	description:{type:String}
})

module.exports = mongoose.model('Category',BookSchema);