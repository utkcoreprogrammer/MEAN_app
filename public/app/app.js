angular.module("splitwiseApp",["routesApp", "userCtrls","userServices", "mainModule","authServices"])
.config(function($httpProvider)
{
console.log("testing app.js");
$httpProvider.interceptors.push('AuthInterceptors');
});