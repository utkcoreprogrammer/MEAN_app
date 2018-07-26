angular.module('userCtrls',['userServices'])
.controller('registerCtrl',function($scope,$http,$location,$timeout,User)
{	
	$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	$scope.pass_regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	var app = this;
	$scope.item = {};
	$scope.friendList = [];
	$scope.groupMembers = [];
	$scope.groupList = [];
	app.friendData = {
		     		 fname: '',
             		 email: ''
					 };
	app.groupData = {
		     		 groupName: '',
             		 members: ['']
					 };
	$http.get('/api/getFriendList').then(function(data)
    {
	
		// app.friendinfo=data;
		$scope.friendList = data.data.data;
		$scope.groupMembers = data.data.data;
		console.log("Friend Info" , $scope.friendList);
		$scope.item = $scope.groupMembers.map(({fname}) => fname)
		console.log("Group Info" , $scope.item);
	
	});

	$http.get('/api/getGroupList').then(function(data)
    {
	
		console.log("data ->>>>>",data);
		$scope.groupList = data.data.data;
		console.log("Group Info", $scope.groupList);
		
	
	});



	app.regUser=function(regData)
	{
		console.log("app.regData", app.regData);
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



	app.createfriend= function()
	{	
		console.log("Inside add friend",app.friendData);
		$http.post('/api/friendList',app.friendData);
		location.reload();
		alert("Friend added Successfully");
		
	
	};

	app.createGroup= function()
	{	
		console.log("Inside create group",app.groupData);
		$http.post('/api/groupList',app.groupData);
		location.reload();
		alert("Group created Successfully");
		
	
	};

});