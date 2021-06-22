var mongoose = require('mongoose');
//getting Schema class from mongoose.Schema
var Schema = mongoose.Schema;
const UserSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("User", UserSchema);