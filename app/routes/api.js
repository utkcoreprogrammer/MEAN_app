var User = require('../models/userModel');
var Friend = require('../models/friendModel');
var Bill = require('../models/billModel');
var Group = require('../models/groupModel');
var jwt = require('jsonwebtoken');
var secret = "Harry";
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
	var email = req.body.email;
	var password = req.body.password;
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
					var token = jwt.sign({ email: userdetails.email, username : userdetails.username }, secret, {expiresIn : '1h'});
					res.status(200).json({success: true, message : "user authenticated", token : token});
				}
				
				else
				{
					res.json({success: false, message: "Invalid password"});
				}
			
			}
		});
	}	
});

router.post('/friendList', function(req,res)

{
	console.log("hitting friendlist");
	var friend = new Friend();
	friend.fname = req.body.fname; 
	friend.email = req.body.email;

	if(req.body.fname == null || req.body.fname == '' || req.body.email == null || req.body.email == '')
	{
		res.json({success: false, message: "Ensure that Name & Email is provided"});
	}
		else 
	{
		friend.save((err, user) => 
		{
			if(err)
			{
			res.json({success: false, message: "Username or Email already taken"});
			}
			else
			{
			res.status(200).json({success: true, message : "Friend added"});
			}
		});
	}
});

router.post('/groupList', function(req,res)

{
	console.log("Hitting group List API");
	var group = new Group(req.body);

	group.save((err, user) => 
		{
			if(err)
			{
			res.json({success: false, message: "Some error occured in adding"});
			}
			else
			{
			res.status(200).json({success: true, message : "Group created"});
			}
		});
});

router.post('/billData', function(req,res)

{
	console.log("Hitting bill data api");

	var bill = new Bill(req.body);
	bill.save((err, user) => 
		{
			if(err)
			{
			res.json({success: false, message: "Some error occured"});
			}
			else
			{
			res.status(200).json({success: true, message : "Bill added"});
			}
		});
});

router.get('/getFriendList', function(req,res)

{
	Friend.find({}).exec(function(err,friendList)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			res.json({data: friendList});
		}
	})
});


router.get('/getGroupList', function(req,res)

{
	Group.find({}).exec(function(err,groupList)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			res.json({data: groupList});
		}
	})
});

router.use(function(req,res,next)
	
{
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token)
	{
		jwt.verify(token, secret, function(err,decoded)

		{
			if(err)
			{
				res.json({success : false, message : "Token invalid"});
			}
			else
			{
				req.decoded = decoded;
				next();
			}

		});
	}
	else
	{
		res.json({success : false, message :  "No token provided"});
	}
});

router.post('/currentUser', function(req,res)

{

	res.send(req.decoded);
});



 return router;
}

