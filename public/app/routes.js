var app = angular.module("routesApp", ["ngRoute"])
.config(function($routeProvider, $locationProvider)
{
		$routeProvider.caseInsensitiveMatch =true;
			$routeProvider
			.when("/",
			{
			redirectTo  : "/"
			})

			.when("/login", 
			{
			templateUrl : "app/views/pages/login.html"
			// controller :  ""		
			}) 
			.when("/register", 
			{
			templateUrl : "app/views/pages/register.html",
			controller :  "registerCtrl",
			controllerAs :  "register"			
			}) 

			// .when("/groups", 
			// {
			// templateUrl : "Templates/groups.html",
			// controller :  "groupsController"
			// })

			// .when("/friendList", 
			// {
			// templateUrl : "Templates/friendList.html",
			// controller :  "friendListController"
			// })

			// .when("/groupList", 
			// {
			// templateUrl : "Templates/groupList.html",
			// controller :  "groupListController"
			// })

			// .when("/error", 
			// {
			// template : "<h2> Wrong URL </h2>"
			// })

			.otherwise ({
				redirectTo : "/error"
				});
			$locationProvider.html5Mode({
  				enabled: true,
  				requireBase: false
			});
});