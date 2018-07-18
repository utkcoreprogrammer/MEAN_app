var User = require('../models/userModel');

module.exports = function(router) {


router.post('/users', function(req,res)

{
	console.log("req.body", req.body);
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	if(req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '')
	{
		console.log("Ensure that Username, Email & Password is provided");
	}
	else 
	{
		user.save((err, user) => 
		{
			if(err)
			{
			console.log("There is some Error", err);
			}
			else
			{
			res.status(200).json({"user": user});
			}
		});
	}	
});
 return router;
}