var app = angular.module("firstAngularApp", [ 'ngRoute' ]);

app.factory('myFactory', function($http, $q) {
	/*
	 * var customers = [ { name : 'Omkar', city : 'Hyderabad' }, { name :
	 * 'Muzeeb', city : 'Delhi' }, { name : 'Nikhil', city : 'Bangalore' }, {
	 * name : 'Ravindra', city : 'Hyderabad' } ];
	 */

	var customers = $q.defer();
	$http.get('http://localhost:8080/hello/angulartest/getuser').then(
			function(response) {
				alert(JSON.stringify(response.data));
				customers.resolve(response.data);
			}, function(response) {
				alert("error");
				customers.reject;
			});


	var factory = {};
	factory.getCustomers = function() {
		return customers.promise;
	};

	return factory;
});

app.controller('MyController', function($scope, myFactory) {
	var myCustomersPromise = myFactory.getCustomers();
	myCustomersPromise.then(function(value) { // this is only run after $http completes
		alert('controller - myCustomersPromise');
		$scope.customers = value;
	}, function(reason) {
		alert('promise reasson');
	}, function(value) {
		alert('promise value');
	});

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
