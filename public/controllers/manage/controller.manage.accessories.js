angular.module('manage.controller.accessories', [])
.controller('AccessoriesController', [
'$scope',
'$modal',
'$q',
'promiseTracker',
'AlertService',
'ImageEditService',
'ReallyService',
'CategoryService',
'GroupService',
'AccessoryService',
function($scope, $modal, $q, promiseTracker, AlertService, ImageEditService, ReallyService, CategoryService, GroupService, AccessoryService) {

	$scope.categories = [];
	$scope.groups = [];
	$scope.accessories = [];

	$scope.updateCategories = function() {
		CategoryService.findAll().then(function(data) {
			$scope.categories = data;
			for (var i = 0; i < $scope.categories.length; i++) {
				$scope.categories[i].tracker = promiseTracker();
			}
		}, function() {
			AlertService.add('danger', 'Unable to load categories.');
		});
	}
	$scope.updateCategories();

	function updateAccessories() {
		$q.all([
			AccessoryService.findAll().then(function(data) {
				$scope.accessories = data;
			}),
			GroupService.findAll().then(function(data) {
				$scope.groups = data;
			})
		]).catch(function() {
			AlertService.add('danger', 'Unable to load accessories.');
		});
	}
	updateAccessories();

	$scope.openImageModal = function(accessory) {
		ImageEditService.open(AccessoryService.imageUrl(accessory.id), AccessoryService.uploadImage.bind(null, accessory.id));
	}

	$scope.filterAccessories = function(accessory) {
		return !$scope.selectedCategory || accessory.category.id == $scope.selectedCategory;
	}

	$scope.hasGroup = function(accessory, group) {
		for (var i = 0; i < accessory.groups.length; i++) {
			if (accessory.groups[i].id == group.id) {
				return true;
			}
		}
		return false;
	}

	$scope.editCategories = function() {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'editCategories.html',
			controller: 'accessories.CategoriesController',
			resolve: {
				parentScope: function() { return $scope; }
			}
		});

		modal.result.finally($scope.updateCategories);
		return modal;
	}

	$scope.addAccessory = function() {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'editAccessory.html',
			controller: 'accessories.EditAccessoryController',
			resolve: {
				callback: function() { return AccessoryService.create; },
				groups: function() { return $scope.groups; },
				categories: function() { return $scope.categories; },
				accessory: function() {
					return {
						category: $scope.selectedCategory
					};
				}
			}
		});

		modal.result.then(updateAccessories);
		return modal;
	};

	$scope.editAccessory = function(accessory) {
		var modal = $modal.open({
			size: 'small',
			templateUrl: 'editAccessory.html',
			controller: 'accessories.EditAccessoryController',
			resolve: {
				callback: function() { return AccessoryService.update.bind(null, accessory.id); },
				groups: function() { return $scope.groups; },
				categories: function() { return $scope.categories; },
				accessory: function() {
					var copy = angular.copy(accessory);
					copy.category = copy.category ? copy.category.id : null;
					copy.groups = {};
					angular.forEach(accessory.groups, function(group) {
						copy.groups[group.id] = true;
					});
					return copy;
				}
			}
		});

		modal.result.then(updateAccessories);
		return modal;
	};

	$scope.deleteAccessory = function(accessory) {
		ReallyService.prompt({
			body: 'Are you sure you want to delete the accessory "' + accessory.name + '"?'
		}, AccessoryService.delete.bind(null, accessory.id)).result.then(function() {
			AlertService.add('success', 'Successfully deleted the accessory.');
			updateAccessories();
		});
	};

}])
.controller('accessories.CategoriesController', [
'$scope',
'$modalInstance',
'promiseTracker',
'AlertService',
'CategoryService',
'parentScope',
function($scope, $modalInstance, promiseTracker, AlertService, CategoryService, parentScope) {

	$scope.close = $modalInstance.close;
	$scope.addTracker = promiseTracker();
	$scope.parentScope = parentScope;
	parentScope.updateCategories();

	$scope.addCategory = function() {
		var deferred = $scope.addTracker.createPromise();
		CategoryService.create({
			name: $scope.categoryName
		}).then(function() {
			parentScope.updateCategories();
			$scope.categoryName = "";
		}, function() {
			AlertService.add('danger', 'Unable to save category');
			$modalInstance.dismiss();
		}).finally(deferred.resolve);
	}

	$scope.deleteCategory = function(category) {
		var deferred = category.tracker.createPromise();
		CategoryService.delete(category.id).then(parentScope.updateCategories, function() {
			AlertService.add('danger', 'Unable to delete category.');
			$modalInstance.dismiss();
		}).finally(deferred.resolve);
	}

}])
.controller('accessories.EditAccessoryController', [
'$scope',
'$modalInstance',
'promiseTracker',
'AlertService',
'callback',
'groups',
'categories',
'accessory',
function($scope, $modalInstance, promiseTracker, AlertService, callback, groups, categories, accessory) {

	$scope.groups = groups;
	$scope.categories = categories;
	$scope.accessory = accessory;
	$scope.tracker = promiseTracker();

	$scope.cancel = $modalInstance.dismiss;
	$scope.save = function() {

		var deferred = $scope.tracker.createPromise();

		var accessory = angular.copy($scope.accessory);
		accessory.groups = [];
		angular.forEach($scope.accessory.groups, function(value, key) {
			if (value) {
				accessory.groups.push(key);
			}
		});

		callback(accessory).then(function() {
			AlertService.add('success', 'Successfully saved accessory.');
			$modalInstance.close();
		}, function() {
			AlertService.add('danger', 'Unable to save accessory.');
			$modalInstance.close();
		}).finally(deferred.resolve);
	}

}]);
