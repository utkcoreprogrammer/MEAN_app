angular.module('authServices',[])
.factory('Auth',function($http, AuthToken)
{
	var authFactory={};
	authFactory.find=function(credentials)
	{
		return $http.post('/api/authenticate',credentials).then(function(data)
		{
			AuthToken.setToken(data.data.token);
			return data;
		});
	};

	authFactory.isLoggedIn = function()
	{
		if(AuthToken.getToken())
		{
			return true;
		}
		else 
		{
			return false; 
		}
	};

	authFactory.logOut = function()
	{
			AuthToken.setToken();
	};

	authFactory.getUser = function()

	{
		if(AuthToken.getToken())
		{
			return $http.post('api/currentUser');
		}
		else
		{
			$q.reject({message : 'User has no token'});
		}
	};

	return authFactory;
})

.factory('AuthToken', function($window)
{
	var authTokenFactory = {};

	authTokenFactory.setToken = function(token)
	{
		if(token)
		{	
		$window.localStorage.setItem('token', token);
		}
		else
		{
		$window.localStorage.removeItem('token');	
		}
	};


	authTokenFactory.getToken = function()
	{
		return $window.localStorage.getItem('token');
	};
	return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken)
{
	var authInterceptorsFactory = {};
	authInterceptorsFactory.request = function(config)
	{
		var token = AuthToken.getToken();
		if(token)
		{
			config.headers['x-access-token'] = token;
		}
		return config;
	};

	return authInterceptorsFactory; 
});