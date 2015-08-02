angular.module('manage.controller.accent-bows', [])
.controller('AccentBowsController', [
'$scope',
'$modal',
'$q',
'AlertService',
'ImageEditService',
'ReallyService',
'GroupService',
'AccentBowService',
function($scope, $modal, $q, AlertService, ImageEditService, ReallyService, GroupService, AccentBowService) {

	$scope.groups = [];
	$scope.bows = [];

	function updateBows() {
		$q.all([
			GroupService.findAll().then(function(data) {
				$scope.groups = data;
			}),
			AccentBowService.findAll().then(function(data) {
				$scope.bows = data;
			})
		]).catch(function(data) {
			AlertService.add('danger', 'Unable to load accent bows.');
		});
	}
	updateBows();

	$scope.openImageModal = function(bow) {
		ImageEditService.open(AccentBowService.imageUrl(bow.id), AccentBowService.uploadImage.bind(null, bow.id));
	}

	$scope.addBow = function(group) {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'edit-accent-bow.html',
			controller: 'accent-bows.EditAccentBowController',
			resolve: {
				callback: function() { return AccentBowService.create; },
				groups: function() { return $scope.groups; },
				bow: function() { 
					return {
						group: group.id
					}; 
				}
			}
		});
		modal.result.then(updateBows);
	};

	$scope.editBow = function(bow) {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'edit-accent-bow.html',
			controller: 'accent-bows.EditAccentBowController',
			resolve: {
				callback: function() { return AccentBowService.update.bind(null, bow.id); },
				groups: function() { return $scope.groups; },
				bow: function() {
					var copy = angular.copy(bow);
					copy.group = bow.group.id;
					return copy;
				}
			}
		});
		modal.result.then(updateBows);
	};

	$scope.deleteBow = function(bow) {
		ReallyService.prompt({
			body: 'Are you sure you want to delete the accent bow "' + bow.name + '"?'
		}, AccentBowService.delete.bind(null, bow.id)).result.then(function() {
			AlertService.add('success', 'Successfully deleted the bow.');
			updateBows();
		});
	};

}])
.controller('accent-bows.EditAccentBowController', [
'$scope',
'$modalInstance',
'promiseTracker',
'AlertService',
'callback',
'groups',
'bow',
function($scope, $modalInstance, promiseTracker, AlertService, callback, groups, bow) {
	$scope.bow = bow;
	$scope.groups = groups;

	$scope.tracker = promiseTracker();

	$scope.cancel = $modalInstance.dismiss;

	$scope.save = function() {
		var deferred = $scope.tracker.createPromise();
		var promise = callback($scope.bow).then(function() {
			AlertService.add('success', 'Successfully saved accent bow!');
			$modalInstance.close();
		}, function() {
			AlertService.add('danger', 'Unable to save accent bow.');
			$modalInstance.dismiss();
		}).finally(deferred.resolve);
	}
}]);
