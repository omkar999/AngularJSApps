var app = angular.module("firstAngularApp", [ 'ngRoute' ]);

app.factory('myFactory', function($http) {
	var customers = [ {
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
	} ];
	
	/*$http({
		  method: 'GET',
		  url: 'http://localhost:8080/hello/omkar'
		}).then(function successCallback(response) {
			console.log(response);
			 alert(response);
		  $scope.rest=response;
		  }, function errorCallback(response) {
			  console.log(response);
		    alert(response);
		    $scope.rest=response;
		  });
*/
	/*
	$http.get('').then(function(response) {
		$scope.restresponse = response.data;
		console.log(restresponse)
	}, function(error) {
		console.log(error)
		alert(error.status );
	}, function(er) {
		alert(error.er);
	})
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
			name : $scope.newCustomer.name,
			city : $scope.newCustomer.city
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



