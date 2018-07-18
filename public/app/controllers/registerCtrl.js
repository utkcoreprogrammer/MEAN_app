angular.module('userCtrls',['userServices'])
.controller('registerCtrl',function($scope,$http,$location,$timeout,User)
{	
	$scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	$scope.pass_regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	var app=this;
	this.regUser=function(regData)
	{
		app.loading=true;
		app.errorMsg=false;
		console.log(this.regData);

User.create(app.regData).then(function(data)
{
	console.log(data.data.success);
	console.log(data.data.message);
	if(data.data.success)
	{
		app.loading=false;
		app.successMsg=data.data.message +'....Redirecting';
		$timeout(function()	
		{
		$location.path('/');
		},2000);
	}
	else
	{
	app.loading=false;
	app.errorMsg=data.data.message;
	}
});
};
});