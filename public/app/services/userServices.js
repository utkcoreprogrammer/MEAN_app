angular.module('userServices',[])
.factory('User',function($http)
{
	var userFactory={};
	// var friendFactory = {};
	console.log("User Service hitting");
//custom function
userFactory.create=function(regData)
{
	return $http.post('/api/users',regData);
}
	return userFactory;

// friendFactory.createNew=function(friend)
// {
// 	return $http.post('/api/friendList',friend);
// }
// 	return friendFactory;




});