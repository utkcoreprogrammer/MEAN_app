angular.module('authServices',[])
.factory('Auth',function($http)
{
	var authFactory={};
	console.log("Auth Service hitting");
//custom function
authFactory.find=function(credentials)
{
	return $http.post('/api/authenticate',credentials);
}
	return authFactory;


});