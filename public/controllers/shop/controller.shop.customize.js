angular.module('shop.controller.customize', [])
.controller('CustomizeController', [
'$scope',
'$stateParams',
'promiseTracker',
'AlertService',
'MumService',
'OrderService',
function($scope, $stateParams, promiseTracker, AlertService, MumService, OrderService) {

	$scope.order_id = $stateParams.order_id;
	$scope.order = {};
	$scope.mum = {};

	$scope.mumTracker = promiseTracker();
	var deferred = $scope.mumTracker.createPromise();

	$scope.mumPromise = OrderService.findById($scope.order_id).then(function(data) {
		$scope.order = data;
		$scope.mum = data.mum;
		deferred.resolve();
	}, function() {
		AlertService.add('danger', 'Unable to load the order.');
	});

	$scope.save = function(mum) {
		var target = angular.copy(mum);

		if (target.backing) target.backing = target.backing.id;
		if (target.accentBow) target.accentBow = target.accentBow.id;
		if (target.ribbons) {
			for (var i = 0; i < target.ribbons.length; i++) {
				target.ribbons[i].letter = target.ribbons[i].letter.id;
			}
		}
		return MumService.update($scope.mum.id, target).then(function(data) {
			console.log(data);
			$scope.mum = data;
		}, function() {
			AlertService.add('danger', 'Unable to save the mum.');
		});
	};

}]);
