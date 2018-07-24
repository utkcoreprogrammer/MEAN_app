angular.module('userCtrls',['userServices'])
.controller('registerCtrl',function($scope,$http,$location,$timeout,User)
{	
	$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	$scope.pass_regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	var app = this;
	app.regUser=function(regData)
	{
		
		User.create(app.regData).then(function(data)
		{
			if(app.regData)
			{
				
				alert("User Successfully Registered");
				$timeout(function() 
				{	
				$location.path('/home');
				}, 1000);
			}
			else
			{
				
				alert("Please fill out all the fields");
			}
		});
	};


	//function for storing friends data



	this.createfriend= function(friendData)
	{	
		console.log("Inside add friend",friendData);
		$http.post('/api/friendList',this.friendData)
		
	
	};

});