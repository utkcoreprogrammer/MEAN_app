var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(
	{
		username: {type: String, lowercase: true},
		email: {type: String, lowercase: true},
		password: {type: String, maxlength: 15, minlength : 8}



	});
module.exports = mongoose.model('User', userSchema)







