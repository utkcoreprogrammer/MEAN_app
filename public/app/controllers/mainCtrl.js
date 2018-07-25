angular.module('mainModule', ['authServices','userServices'])
.controller('mainCtrl', function($scope,$http,$location,$timeout,Auth,$rootScope,User)
{
	console.log("testing main controller");
	var myapp = this;
	$scope.billData = {};
	$scope.Values = [];
	var item = {};
	$scope.percentPlaceholder = "Enter Percentage";
	$scope.sharesPlaceholder  = "Enter Share(s)";
	$scope.customPlaceholder  = "Enter Custom Amount";
	$scope.billItems = {};
	


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
			$scope.username2 = data.data.username;
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
	myapp.arrayToString = function(string)
	{

		return string.join(" | ");

	};
	
	myapp.splitEqually = function()
	{

		$scope.showme2= false;
		$scope.showme3= false;															
		$scope.showme4= false;
		// $scope.Bill_group_name = $scope.Bill.groupName;
		// $scope.Bill.members_oweAmount = $scope.Bill.members.amount;
		// $scope.Bill.members_fname = $scope.Bill.members.fname;
		// $scope.Bill_members_count = $scope.Bill.members.length+1;
		// $scope.Bill_total_amount = $scope.Bill.totalAmount;
		// $scope.Bill_equally = $scope.Bill_total_amount / $scope.Bill_members_count;
					
			if(isNaN($scope.Bill_total_amount))
			{

			alert("Amount is Required");

			}

			if(!$scope.Bill_group_name)
			{

			alert("Description is Required");

			}

			




		



	};
	

	myapp.splitByPercentage = function()
	{
		$scope.showme1 = false;
		$scope.showme3= false;												
		$scope.showme4= false;
		$scope.Bill_group_name = $scope.Bill.groupName;
		$scope.Bill.members_oweAmount = $scope.Values;
		//console.log("$scope.Values.ByPercent" , $scope.Values.ByPercent);
		$scope.Bill.members_fname = $scope.Bill.members.fname;
		$scope.Bill_members_count = $scope.Bill.members.length+1;
		$scope.Bill_total_amount = $scope.Bill.totalAmount;
		$scope.Bill_equally = $scope.Bill_total_amount / $scope.Bill_members_count;

			if(!$scope.Bill_group_name)
			{

			alert("Description is Required");

			}	

			$scope.billItems.groupName = $scope.Bill.groupName;
			$scope.billItems.members = {};
			$scope.billItems.members.fname = $scope.Bill.members.fname;
			//$scope.billItems.members.amount = $scope.Values;
			$scope.billItems.totalAmount = $scope.Bill.totalAmount;
			var item =
			{
		
			 	"name" : $scope.Bill.members_fname,
			 	"oweAmount" : $scope.Bill.members_oweAmount
			};	

			   $scope.billData =
			{
				"groupName" : $scope.Bill_group_name,
			 	"members" : item,
			 	"totalAmount" : $scope.Bill_total_amount
			};

		console.log("item object", item);
	console.log("billItems" , $scope.billItems);
	console.log("billData" , $scope.billData);
			
		  

		




	};
	
	myapp.saveBillDataPercent = function()
		{
	console.log("item object", item);
	console.log("billData" , $scope.billData);
		};
	myapp.splitByShares = function()
	{
		$scope.showme1 = false;
		$scope.showme2= false;															
		$scope.showme4= false;

			if(!$scope.Bill_group_name)
			{

			alert("Description is Required");

			}	

	};

	myapp.splitCustom = function()
	{
		$scope.showme1 = false;
		$scope.showme2= false;
		$scope.showme3= false;

			if(!$scope.Bill_group_name)
			{

			alert("Description is Required");

			}		
	};





});
