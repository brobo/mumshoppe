angular.module('manage.controller.bears', [])
.controller('BearsController', [
'$scope',
'$modal',
'$q',
'AlertService',
'ImageEditService',
'ReallyService',
'BearService',
'GroupService',
function($scope, $modal, $q, AlertService, ImageEditService, ReallyService, BearService, GroupService) {

	$scope.bears = [];
	$scope.groups = [];

	function updateBears() {
		$q.all([
			BearService.findAll().then(function(data) {
				$scope.bears = data;
			}),
			GroupService.findAll().then(function(data) {
				$scope.groups = data;
			})
		]).catch(function() {
			AlertService.add('danger', 'Unable to load bears.');
		});
	}
	updateBears();

	$scope.hasGroup = function(bear, group) {
		for (var i = 0; i < bear.groups.length; i++) {
			if (bear.groups[i].id == group.id) {
				return true;
			}
		}
		return false;
	}

	$scope.openImageModal = function(bear) {
		ImageEditService.open(BearService.imageUrl(bear.id), BearService.uploadImage.bind(null, bear.id));
	}

	$scope.addBear = function() {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'editBear.html',
			controller: 'bears.EditBearController',
			resolve: {
				callback: function() { return BearService.create; },
				groups: function() { return $scope.groups; },
				bear: function() { return {}; }
			}
		});
		modal.result.then(updateBears);
		return modal;
	};

	$scope.editBear = function(bear) {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'editBear.html',
			controller: 'bears.EditBearController',
			resolve: {
				callback: function() { return BearService.update.bind(null, bear.id); },
				groups: function() { return $scope.groups; },
				bear: function() {
					var copy = angular.copy(bear);
					copy.groups = {};
					angular.forEach(bear.groups, function(group) {
						copy.groups[group.id] = true;
					});
					return copy;
				}
			}
		});
		modal.result.then(updateBears);
		return modal;
	};

	$scope.deleteBear = function(bear) {
		ReallyService.prompt({
			body: 'Are you sure you want to delete the bear "' + bear.name + '"?'
		}, BearService.delete.bind(null, bear.id)).result.then(function() {
			AlertService.add('success', 'Successfully deleted the bear.');
			updateBears();
		});
	};

}])
.controller('bears.EditBearController', [
'$scope',
'$modalInstance',
'promiseTracker',
'AlertService',
'callback',
'groups',
'bear',
function($scope, $modalInstance, promiseTracker, AlertService, callback, groups, bear) {

	$scope.groups = groups;
	$scope.bear = bear;

	$scope.cancel = $modalInstance.dismiss;
	$scope.tracker = promiseTracker();

	$scope.save = function() {

		var bear = angular.copy($scope.bear);
		bear.groups = [];
		angular.forEach($scope.bear.groups, function(value, key) {
			if (value) {
				bear.groups.push(key);
			}
		});

		var deferred = $scope.tracker.createPromise();
		callback(bear).then(function() {
			AlertService.add('success', 'Successfully saved bear!');
			$modalInstance.close();
		}, function() {
			AlertService.add('danger', 'Unable to save bear.');
			$modalInstance.dismiss();
		}).finally(deferred.resolve);
	}

}]);
