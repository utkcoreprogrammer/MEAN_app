var User = require('../models/userModel');

module.exports = function(router) {


router.post('/users', function(req,res)

{
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	if(req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '')
	{
		res.json({success: false, message: "Ensure that Username, Email & Password is provided"});
	}
	else 
	{
		user.save((err, user) => 
		{
			if(err)
			{
			res.json({success: false, message: "Username or Email already taken"});
			}
			else
			{
			res.status(200).json({success: true, message : "user created"});
			}
		});
	}	
});

router.post('/authenticate', function(req,res)

{
	//var user = new User();
	var email = req.body.email;
	var password = req.body.password;
	console.log(email);
	console.log(password);
	if(req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '')
	{
		console.log("Ensure that Email & Password is provided");
	}
	else 
	{
		User.findOne({"email" : email},(err,userdetails) => 
		{
			if(err)
			{
			console.log("There is some Error", err);
			}
			else
			{
				if(!userdetails)
				{
					console.log("user not authenticated");
					res.json({success: false, message : "user not authenticated"});

				}

				else if(userdetails.email == email && userdetails.password == password)
				{
					res.status(200).json({success: true, message : "user authenticated"});
				}
				
				else
				{
					res.json({success: false, message: "Invalid password"});
				}
			
			}
		});
	}	
});
 return router;
}