angular.module('shop.controller.customize', [])
.controller('CustomizeController', [
'$scope',
'$stateParams',
'promiseTracker',
'AlertService',
'MumService',
function($scope, $stateParams, promiseTracker, AlertService, MumService) {

	$scope.mum_id = $stateParams.mum_id;
	$scope.mum = {};

	$scope.mumTracker = promiseTracker();
	var deferred = $scope.mumTracker.createPromise();

	$scope.mumPromise = MumService.findById($scope.mum_id).then(function(data) {
		$scope.mum = data;
		deferred.resolve();
		console.log($scope.mum);
	}, function() {
		AlertService.add('danger', 'Unable to load the mum.');
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
