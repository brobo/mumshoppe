angular.module('shop.controller.accessories', [])
.controller('AccessoriesController', [
'$scope',
'$modal',
'promiseTracker',
'AlertService',
'AccessoryService',
'AccessoryAssociationService',
'CategoryService',
function($scope, $modal, promiseTracker, AlertService, AccessoryService, AccessoryAssociationService, CategoryService) {

	$scope.categories = [];
	$scope.accessories = [];
	$scope.associations = {};

	CategoryService.findAll().then(function(data) {
		$scope.categories = data;
	}, function() {
		AlertService.add('danger', 'Unable to load categories.');
	});

	$scope.mumPromise.then(function() {
		for (var i = 0; i < $scope.mum.associations.length; i++) {
			$scope.associations[$scope.mum.associations[i].accessory.id] = $scope.mum.associations[i];
		}
	}).then(AccessoryService.findAll).then(function(data) {
		$scope.accessories = data;
		for (var i = 0; i < $scope.accessories.length; i++) {
			$scope.accessories[i].imageUrl = AccessoryService.imageUrl($scope.accessories[i].id);
			$scope.accessories[i].tracker = promiseTracker();
		}
		console.log($scope.associations);
	});

	$scope.hasAccessory = function(accessory) {
		return (accessory.id in $scope.associations);
	}

	$scope.filterAccessories = function(group) {
		return function(accessory) {
			if ($scope.selectedCategory && 
				accessory.category && 
				accessory.category.id != $scope.selectedCategory) {
				return false;
			}
			for (var i = 0; i < accessory.groups.length; i++) {
				if (accessory.groups[i].id == group.id) {
					return true;
				}
			}
			return false;
		}
	}

	$scope.addAssociation = function(accessory) {
		$modal.open({
			size: 'sm',
			templateUrl: 'edit-association.html',
			controller: 'EditQuantityController',
			resolve: {
				association: function() {
					return {
						mum: $scope.mum,
						accessory: accessory,
						quantity: 1
					};
				},
				callback: function() {
					return function(association) {
						return AccessoryAssociationService.create(association).then(function(data) {
							$scope.associations[data.accessory.id] = data;
						});
					};
				}
			}
		});
	}

	$scope.editAssociation = function(accessory) {
		$modal.open({
			size: 'sm',
			templateUrl: 'edit-association.html',
			controller: 'EditQuantityController',
			resolve: {
				association: function() {
					var target = angular.copy($scope.associations[accessory.id]);
					target.mum = $scope.mum;
					return target;
				},
				callback: function() {
					return function(association) {
						return AccessoryAssociationService.update(association.id, association).then(function(data) {
							$scope.associations[data.accessory.id] = data;
						});
					};
				}
			}
		});
	}
	
	$scope.removeAssociation = function(accessory) {
		var deferred = accessory.tracker.createPromise();
		AccessoryAssociationService.delete($scope.associations[accessory.id].id).then(function() {
			delete $scope.associations[accessory.id];
		}, function() {
			AlertService.add('danger', 'An error occured while remove the accessory.');
		}).finally(deferred.resolve);
	}

}])
.controller('EditQuantityController', [
'$scope',
'$modalInstance',
'AlertService',
'promiseTracker',
'callback',
'association',
function($scope, $modalInstance, AlertService, promiseTracker, callback, association) {

	$scope.association = association;
	$scope.accessory = association.accessory;
	$scope.tracker = promiseTracker();
	$scope.cancel = $modalInstance.dismiss;

	$scope.increase = function() {
		$scope.association.quantity++;
	}

	$scope.decrease = function() {
		if ($scope.association.quantity > 1) {
			$scope.association.quantity--;
		}
	}

	$scope.save = function() {
		var deferred = $scope.tracker.createPromise();
		var target = angular.copy($scope.association);
		target.mum = target.mum.id;
		target.accessory = target.accessory.id;
		callback(target).then($modalInstance.close.bind(null, $scope.association), function() {
			AlertService.add('danger', 'Unable to save accessory.');
			$modalInstance.dismiss();
		}).finally(deferred);
	}

}]);
