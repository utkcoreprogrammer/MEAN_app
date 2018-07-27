var app = angular.module("routesApp", ["ngRoute"])
.config(function($routeProvider, $locationProvider)
{
		$routeProvider.caseInsensitiveMatch =true;
			$routeProvider

			.when("/",
			{
			templateUrl : "app/views/pages/home.html",
			controller :  "mainCtrl",
			controllerAs :  "main"
			})

			.when("/postSignup",
			{
			templateUrl : "app/views/pages/postSignup.html",
			controller :  "mainCtrl",
			controllerAs :  "main"
			})


			.when("/login", 
			{
			templateUrl : "app/views/pages/login.html",
			controller :  "mainCtrl",
			controllerAs :  "main"		
			}) 
			.when("/register", 
			{
			templateUrl : "app/views/pages/register.html",
			controller :  "registerCtrl",
			controllerAs :  "register"			
			}) 

			.when("/dashboard", 
			{
			templateUrl : "app/views/pages/dashboard.html",
			controller :  "mainCtrl",
			controllerAs :  "main"			
			}) 

			.when("/logout", 
			{
			templateUrl : "app/views/pages/logout.html",
			controller :  "mainCtrl",
			controllerAs :  "main"			
			})
			.when("/logoutWait", 
			{
			templateUrl : "app/views/pages/logoutWait.html",
			controller :  "mainCtrl",
			controllerAs :  "main"			
			})

			.when("/friends", 
			{
			templateUrl : "app/views/pages/friends.html",
			controller :  "registerCtrl",
			controllerAs :  "register"
			}) 

			.when("/groups", 
			{
			templateUrl : "app/views/pages/groups.html",
			controller :  "registerCtrl",
			controllerAs :  "register"
			})

			.otherwise ({
			templateUrl : "app/views/pages/errorPage.html"
				});
			$locationProvider.html5Mode({
  				enabled: true,
  				requireBase: false
			});
});