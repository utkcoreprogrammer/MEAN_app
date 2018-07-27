angular.module("splitwiseApp",["routesApp", "userCtrls","userServices", "mainModule","authServices"])
.config(function($httpProvider)
{
$httpProvider.interceptors.push('AuthInterceptors');
});