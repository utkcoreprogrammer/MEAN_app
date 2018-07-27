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
	app.friendData= {
		     		 fname: '',
             		 email: ''
					};
	app.groupData = {
		     		 groupName: '',
             		 members: ['']
					};
	$http.get('/api/getFriendList').then(function(data)
    {
		$scope.friendList = data.data.data;
		$scope.groupMembers = data.data.data;
		$scope.item = $scope.groupMembers.map(({fname}) => fname)
	});

	$http.get('/api/getGroupList').then(function(data)
    {	
		$scope.groupList = data.data.data;
	});

	app.regUser=function(regData)
	{
		User.create(app.regData).then(function(data)
		{
			if(app.regData)
			{
				
				alert("User Successfully Registered");
				$timeout(function() 
				{	
				$location.path('/postSignup');
				}, 1000);
			}
			else
			{
				
				alert("Please fill out all the fields");
			}
		});
	};

	//function for creating a new friend
	app.createfriend= function()
	{	
		$http.post('/api/friendList',app.friendData);
		location.reload();
		alert("Friend added Successfully");
	};

	app.createGroup= function()
	{	
		$http.post('/api/groupList',app.groupData);
		location.reload();
		alert("Group created Successfully");
	};
	app.arrayToString = function(string)
	{

		return string.join(", ");
	};

});