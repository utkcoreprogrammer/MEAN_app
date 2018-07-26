var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var groupSchema = new Schema(
	{
		groupName: {type: String, lowercase: true},
		members:{
				type: Array,
				item:  {
					 		type: String
						}
				}


	});
module.exports = mongoose.model('Group', groupSchema)







