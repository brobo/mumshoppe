angular.module('shop.controller.bears', [])
.controller('BearsController', [
'$scope',
'promiseTracker',
'AlertService',
'BearService',
function($scope, promiseTracker, AlertService, BearService) {

	$scope.bears = [];

	$scope.mumPromise.then(BearService.findAll).then(function(data) {
		$scope.bears = data;
		for (var i = 0; i < $scope.bears.length; i++) {
			$scope.bears[i].tracker = promiseTracker();
			$scope.bears[i].imageUrl = BearService.imageUrl($scope.bears[i].id);
		}
		console.log($scope.bears);
	});

	$scope.hasGroup = function(group) {
		return function(bear) {
			for (var i = 0; i < bear.groups.length; i++) {
				if (bear.groups[i].id == group.id) {
					return true;
				}
			}
			return false;
		}
	}

	$scope.hasBear = function(bear) {
		for (var i = 0; i < $scope.mum.bears.length; i++) {
			if ($scope.mum.bears[i].id == bear.id) {
				return true;
			}
		}
		return false;
	}

	$scope.addBear = function(bear) {
		var deferred = bear.tracker.createPromise();

		if ($scope.mum.bears.length >= $scope.mum.backing.product.bearLimit) return;
		var target = angular.copy($scope.mum);
		for (var i = 0; i < target.bears.length; i++) {
			target.bears[i] = target.bears[i].id;
		}
		target.bears.push(bear.id);

		$scope.save(target).finally(deferred.resolve);
	}
	
	$scope.removeBear = function(bear) {
		var deferred = bear.tracker.createPromise();

		var target = angular.copy($scope.mum);
		for (var i = 0; i < target.bears.length; i++) {
			if (target.bears[i].id == bear.id) {
				target.bears.splice(i, 1);
				i--;
			} else {
				target.bears[i] = target.bears[i].id;
			}
		}

		$scope.save(target).finally(deferred.resolve);
	}

}]);
