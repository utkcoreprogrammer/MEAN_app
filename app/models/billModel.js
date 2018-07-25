var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var billSchema = new Schema(
	{
		groupName: {type: String, lowercase: true},
		members: {
			type: Array,
			item: {
					name: { type: String, lowercase: true},
					oweAmount : { type : Number}
				  }
			},

		totalAmount : {type : Number}


	});
module.exports = mongoose.model('Bill', billSchema)







