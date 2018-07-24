angular.module('mainModule', ['authServices','userServices'])
.controller('mainCtrl', function($scope,$http,$location,$timeout,Auth,$rootScope,User)
{
	console.log("testing main controller");
	var myapp = this;


	$rootScope.$on('$routeChangeStart', function()
	{

		if(Auth.isLoggedIn())
		{
			console.log("User logged in");
			myapp.userLoggedIn = true;
			Auth.getUser().then(function(data)
			{
			console.log("Data from getUser", data.data.username);
			myapp.username = data.data.username;
			});
		}
		else
		{
		console.log("Not logged in");
		myapp.userLoggedIn = false;
		myapp.username = '';
		}

	});



	myapp.loginHandler = function(credentials)
	{
		Auth.find(myapp.credentials).then(function(data)
		{
			
			if(data.data.success == true)
			{
				
				$timeout(function() 
				{	
				$location.path('/dashboard');
				myapp.credentials = '';
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
	};

	myapp.logOut = function()
	{
		Auth.logOut();
		$location.path("/logoutWait");
		$timeout(function()
		{
		$location.path("/logout");
		}, 2000);
		console.log("logout success");
		
	};




});
