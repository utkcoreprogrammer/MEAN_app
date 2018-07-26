var mongoose  = require('mongoose');
var Schema = mongoose.Schema;
var billSchema = new Schema(
	{
		groupName: String,
		members:{
				type: Array,
				item:  {
					 		type: Object,
					 		properties: 
							{
							newame: String,
							oweAmount : Number
				    		}
						}
				},

		totalAmount : Number
	});

module.exports = mongoose.model('Bill', billSchema)







