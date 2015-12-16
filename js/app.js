var app = angular.module("firstAngularApp", [ 'ngRoute' ]);

app.factory('myFactory', function($http) {
	var customers = [];
	
	/*var customers = [ {
		name : 'Omkar',
		city : 'Hyderabad'
	}, {
		name : 'Muzeeb',
		city : 'Delhi'
	}, {
		name : 'Nikhil',
		city : 'Bangalore'
	}, {
		name : 'Ravindra',
		city : 'Hyderabad'
	} ];*/
	
	
	/*$http.get('/someUrl', config).then(successCallback, errorCallback);*/
	
	
	$http.get('http://localhost:8080/hello/user').then(function(response){
		alert(response.data);
		 customers = response.data;
	}, function(response){
		alert("error");
	});
	
	/*$http({
		  method: 'GET',
		  url: 'http://localhost:8080/hello/user'
		}).then(function successCallback(response) {
		    console.log(response.status);alert(response.data);
		    customers = response.data;
		  }, function errorCallback(response) {
			    console.log('error response status = '+response.status);
		  });
	*/
	
	var factory = {};
	factory.getCustomers = function() {
		return customers;
	};
	
	return factory;
});

app.controller('MyController', function($scope, myFactory) {
	$scope.customers = myFactory.getCustomers();
	$scope.hello = "Hello World!!!";
	$scope.addCustomer = function() {
		$scope.customers.push({
			name : $scope.newcust.name,
			city : $scope.newcust.city
		});
	};
});

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : 'views/home.html',
		controller : "MyController"
	}).when("/hello", {
		templateUrl : "views/hello.html",
		controller : "MyController"
	}).otherwise({
		redirectTo : '/'
	});
} ]);





