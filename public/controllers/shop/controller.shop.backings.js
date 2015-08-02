angular.module('shop.controller.backings', [])
.controller('BackingsController', [
'$scope',
'promiseTracker',
'AlertService',
'BackingService',
function($scope, promiseTracker, AlertService, BackingService) {

	$scope.backings = [];

	$scope.mumPromise
	.then(BackingService.findAll)
	.then(function(data) {
		$scope.backings = data;
		for (var i = 0; i < $scope.backings.length; i++) {
			$scope.backings[i].tracker = promiseTracker();
			$scope.backings[i].imageUrl = BackingService.imageUrl($scope.backings[i].id);
		}
	}, function() {
		AlertService.add('danger', 'Unable to load backings.');
	});

	$scope.select = function(backing) {
		var target = angular.copy($scope.mum);
		target.backing = backing;
		var deferred = backing.tracker.createPromise();

		$scope.save(target).finally(deferred.resolve);
	}


}]);
