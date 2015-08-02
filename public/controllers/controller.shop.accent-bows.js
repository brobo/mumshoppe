angular.module('shop.controller.accent-bows', [])
.controller('AccentBowsController', [
'$scope',
'promiseTracker',
'AlertService',
'AccentBowService',
function($scope, promiseTracker, AlertService, AccentBowService) {

	$scope.bows = [];

	$scope.mumPromise.then(AccentBowService.findAll().then(function(data) {
		$scope.bows = data;
		for (var i = 0; i < $scope.bows.length; i++) {
			$scope.bows[i].tracker = promiseTracker();
			$scope.bows[i].imageUrl = AccentBowService.imageUrl($scope.bows[i].id);
		}
	}, function() {
		AlertService.add('danger', 'Unable to load bows.');
	}));

	$scope.select = function(bow) {
		var target = angular.copy($scope.mum);
		target.accentBow = bow;
		var deferred = bow.tracker.createPromise();

		$scope.save(target).finally(deferred.resolve);
	}
}]);
