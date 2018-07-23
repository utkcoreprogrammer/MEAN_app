var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var friendSchema = new Schema(
	{
		fname: {type: String, lowercase: true},
		email: {type: String, lowercase: true}


	});
module.exports = mongoose.model('Friend', friendSchema)







