angular.module('shop.controller.login', [])
.controller('LoginController', [
'$scope',
'promiseTracker',
'AlertService',
'CustomerService',
function($scope, promiseTracker, AlertService, CustomerService) {

	$scope.PHONE_REGEX = /^(\(?[0-9]+\)?[- ]?){3,4}$/;

	$scope.customer = {};
	$scope.tracker = promiseTracker();

	$scope.match = function(form) {
		form.$setValidity('matches', $scope.customer.password === $scope.customer.repeat);
	}

	$scope.doRegister = function() {
		var deferred = $scope.tracker.createPromise();
		CustomerService.register($scope.customer).then(function() {
			console.log('Success!');
		}, function() {
			AlertService.add('danger', 'An error occured while registering.');
		}).finally(deferred.resolve);
	}

	$scope.doLogin = function() {
		console.log('login');
		var deferred = $scope.tracker.createPromise();
		CustomerService.login($scope.customer).then(function() {
			console.log('Success!');
		}, function() {
			AlertService.add('danger', 'Invalid username / password combination.');
		}).finally(deferred.resolve);
	}

}]);
