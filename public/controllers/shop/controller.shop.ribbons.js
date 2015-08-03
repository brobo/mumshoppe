angular.module('shop.controller.ribbons', [])
.controller('RibbonsController', [
'$scope',
'$modal',
'$q',
'promiseTracker',
'AlertService',
'LetterService',
'RibbonService',
function($scope, $modal, $q, promiseTracker, AlertService, LetterService, RibbonService) {

	$scope.tracker = promiseTracker();
	$scope.letters = [];

	LetterService.findAll().then(function(data) {
		$scope.letters = data;
	}, function() {
		AlertService.add('danger', 'Unable to load letters.');
	});

	$scope.addRibbon = function() {
		var modal = $modal.open({
			size: 'medium',
			templateUrl: 'editRibbon.html',
			controller: 'EditRibbonController',
			resolve: {
				callback: function() {
					return function(ribbon) {
						return RibbonService.create(ribbon).then(function(data) {
							$scope.mum.ribbons.push(data);
						});
					};
				},
				saveMum: function() {
					return function() {
						return $scope.save($scope.mum);
					};
				},
				letters: function() {
					return $scope.letters;
				},
				ribbon: function() {
					return {
						mum: $scope.mum.id
					};
				}
			}
		});
	};

	$scope.editRibbon = function(ribbonIndex) {
		var modal = $modal.open({
			size: 'medium',
			templateUrl: 'editRibbon.html',
			controller: 'EditRibbonController',
			resolve: {
				callback: function() {
					return function(target) {
						return RibbonService.update(target.id, target).then(function(data) {
							$scope.mum.ribbons[ribbonIndex] = data;
						});
					};
				},
				saveMum: function() {
					return function() {
						return $scope.save($scope.mum);
					};
				},
				letters: function() {
					return $scope.letters;
				},
				ribbon: function() {
					var target = angular.copy($scope.mum.ribbons[ribbonIndex]);
					target.mum = $scope.mum.id;
					return target;
				}
			}
		});
	}

	$scope.deleteRibbon = function(index) {
		var ribbon = $scope.mum.ribbons[index];
		ribbon.tracker = promiseTracker();
		var deferred = ribbon.tracker.createPromise();
		RibbonService.delete(ribbon.id).then(function() {
			$scope.mum.ribbons.splice(index, 1);
		}, function() {
			AlertService.add('danger', 'Unable to delete name ribbon.');
		}).finally(deferred.resolve);
	};

}])
.controller('EditRibbonController', [
'$scope',
'$modalInstance',
'promiseTracker',
'AlertService',
'callback',
'saveMum',
'letters',
'ribbon',
function($scope, $modalInstance, promiseTracker, AlertService, callback, saveMum, letters, ribbon) {

	$scope.letters = letters;
	$scope.ribbon = ribbon;	
	$scope.tracker = promiseTracker();

	$scope.cancel = $modalInstance.dismiss;

	$scope.save = function() {
		var deferred = $scope.tracker.createPromise();
		var target = angular.copy($scope.ribbon);
		target.letter = target.letter.id;
		callback(target).then($modalInstance.close, function() {
			AlertService.add('danger', 'Unable to save name ribbon.');
			$modalInstance.dismiss();
		}).then(saveMum).finally(deferred.resolve);
	};

}]);
