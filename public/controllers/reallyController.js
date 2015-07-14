angular.module('controller.really', [])
	.controller('ReallyController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'data',
	'callback',
	function($scope, $modalInstance, promiseTracker, data, callback) {

		$scope.data = data;
		$scope.cancel = modalInstance.dismiss;
		$scope.tracker = promiseTracker();

		$scope.confirm = function() {
			var promise = callback();
			if (promise.then) {
				var deferred = $scope.tracker.createPromise();
				promise.then($modalInstance.close, $modalInstance.dismiss).finally(deferred.resolve);
			} else {
				$modalInstance.close();
			}
		}
	}]);