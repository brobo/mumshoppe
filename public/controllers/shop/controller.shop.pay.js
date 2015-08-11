angular.module('shop.controller.pay', [])
.controller('PayController', [
'$scope',
'$cookies',
'$location',
'$state',
'$stateParams',
'promiseTracker',
'AlertService',
'OrderService',
function($scope, $cookies, $location, $state, $stateParams, promiseTracker, AlertService, OrderService) {

	$scope.tracker = promiseTracker();

	$scope.confirm = function() {
		var deferred = $scope.tracker.createPromise();
		OrderService.endPayFlow($stateParams.orderId, $location.search().PayerID).then(function() {
			AlertService.add('success', 'Thank you! Your payment has been confirmed!');
			$state.go('base.home');
		}, function() {
			AlertService.add('danger', 'An error occured while confirming your payment. Please try again.');
		}).finally(deferred.resolve);
	}

}]);
