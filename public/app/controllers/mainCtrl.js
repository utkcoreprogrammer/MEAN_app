angular.module('mainModule', ['authServices'])
.controller('mainCtrl', function($scope,$http,$location,$timeout,Auth)
{
	console.log("testing main controller");
	var myapp = this;

	myapp.loginHandler = function(credentials)
	{
		Auth.find(myapp.credentials).then(function(data)
		{
			
			if(data.data.success == true)
			{
				
				$timeout(function() 
				{	
				$location.path('/dashboard');
				}, 1000);
			}
			else if(data.data.success == false && data.data.message == 'user not authenticated')
			{
				
				alert("User Not Authenticated. Kindly check your credentials");
			}
			else
			{
				alert("Invalid Password");
			}
		})
	}


});
