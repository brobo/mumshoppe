angular.module('shop.controller.review', [])
.controller('ReviewController', [
'$scope',
'$cookies',
'AlertService',
'ReallyService',
'CategoryService',
'OrderService',
function($scope, $cookies, AlertService, ReallyService, CategoryService, OrderService) {

	$scope.categories = [];

	CategoryService.findAll().then(function(data) {
		$scope.categories = data;

	}, function() {
		AlertService.add('danger', 'Unable to load accessory categories!');
	});

	$scope.pay = function() {
		ReallyService.prompt({
			head: 'Pay $25 deposit?',
			body: 'By clicking "Continue", you will be redirected to PayPal to confirm the payment.',
			yes: 'Continue'
		}, OrderService.beginPayFlow.bind(null, $scope.order.id)).result.then(function(data) {
			window.location.href = data.location;
		}, function() {
			AlertService.add('danger', 'An error occured in the payment process. Please try again.');
		});
	};

}]);
