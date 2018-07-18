angular.module('userServices',[])
.factory('User',function($http)
{
	userFactory={};
	console.log("Service hitting");
//custom function
userFactory.create=function(regData)
{
	return $http.post('/api/users',regData);
}
	return userFactory;


});