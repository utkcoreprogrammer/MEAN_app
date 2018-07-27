angular.module('mainModule', ['authServices','userServices'])
.controller('mainCtrl', function($scope,$http,$location,$timeout,Auth,$rootScope,User)
{

	var myapp = this;
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
			myapp.userLoggedIn = true;
			Auth.getUser().then(function(data)
			{
			myapp.username = data.data.username;
			$scope.username2 = data.data.username;
			});
		}
		else
		{
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

		$scope.Value_equally = ($scope.Bill.totalAmount) / ($scope.Bill.members.fname.length+1);
					
			if(isNaN($scope.Bill.totalAmount))
			{

			alert("Amount is Required");

			}

			if(!$scope.Bill.groupName)
			{

			alert("Description is Required");

			}
	};
	
	myapp.splitByPercentage = function()
	{
		$scope.showme1 = false;
		$scope.showme3= false;												
		$scope.showme4= false;
		$scope.Bill_percentValues = $scope.Values;

			if(!$scope.Bill.groupName)
			{

			alert("Description is Required");

			}	
	};
	
	myapp.splitByShares = function()
	{
		$scope.showme1 = false;
		$scope.showme2= false;															
		$scope.showme4= false;
		$scope.Bill_shareValues = $scope.Values;

			if(!$scope.Bill.groupName)
			{

			alert("Description is Required");

			}	
	};

	myapp.splitCustom = function()
	{
		$scope.showme1 = false;
		$scope.showme2= false;
		$scope.showme3= false;
		$scope.Bill_customValues = $scope.Values;


			if(!$scope.Bill.groupName)
			{

			alert("Description is Required");

			}		
	};

	myapp.saveBillDataEqually = function()
	{
			$scope.billItems.groupName = $scope.Bill.groupName;
			$scope.billItems.totalAmount = $scope.Bill.totalAmount;
			$scope.billItems.members = [];
			for (var i=0; i< $scope.Bill.members.fname.length; i++)
			{
				var item =
					{
					 	"name" : $scope.Bill.members.fname[i],
					 	"equalAmount" : $scope.Value_equally
					};	
					   
					$scope.billItems.members.push(item);
			}

			console.log("billItems from equal" , $scope.billItems);
			$http.post('/api/billData', $scope.billItems).then(function(data)
				{
					
				});

			$scope.billItems = {};
	};

	myapp.saveBillDataPercent = function()
	{
			$scope.billItems.groupName = $scope.Bill.groupName;
			$scope.billItems.totalAmount = $scope.Bill.totalAmount;
			$scope.billItems.members = [];

			for (var i=0; i< $scope.Bill.members.fname.length; i++)
			{
				var item =
					{
					 	"name" : $scope.Bill.members.fname[i],
					 	"percentAmount" : $scope.Bill_percentValues[i]
					};	
					   
					$scope.billItems.members.push(item);
			}
	
			$http.post('/api/billData', $scope.billItems).then(function(data)
				{
					
				});

			$scope.billItems = {};
	};

	myapp.saveBillDataShares = function()
	{
			$scope.billItems.groupName = $scope.Bill.groupName;
			$scope.billItems.totalAmount = $scope.Bill.totalAmount;
			$scope.billItems.members = [];

			for (var i=0; i< $scope.Bill.members.fname.length; i++)
			{
				var item =
					{
					 	"name" : $scope.Bill.members.fname[i],
					 	"shareValue" : $scope.Bill_shareValues[i]
					};	
					   
					$scope.billItems.members.push(item);
			}
	
			$http.post('/api/billData', $scope.billItems).then(function(data)
				{
					
				});
			
			$scope.billItems = {};
	};

	myapp.saveBillDataCustom = function()
	{
			$scope.billItems.groupName = $scope.Bill.groupName;
			$scope.billItems.totalAmount = $scope.Bill.totalAmount;
			$scope.billItems.members = [];

			for (var i=0; i< $scope.Bill.members.fname.length; i++)
			{
				var item =
					{
					 	"name" : $scope.Bill.members.fname[i],
					 	"customAmount" : $scope.Bill_customValues[i]
					};	
					   
					$scope.billItems.members.push(item);
			}

			$http.post('/api/billData', $scope.billItems).then(function(data)
				{
					
				});
			
			$scope.billItems = {};
	};
});
