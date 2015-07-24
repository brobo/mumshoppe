angular.module('manage.controller.accessories', [])
	.controller('accessoriesController', [
	'$scope',
	'$modal',
	'promiseTracker',
	'AlertService',
	'ImageEditService',
	'ReallyService',
	'CategoryService',
	'GroupService',
	'AccessoryService',
	function($scope, $modal, promiseTracker, AlertService, ImageEditService, ReallyService, CategoryService, GroupService, AccessoryService) {

		$scope.updateCategories = function() {
			CategoryService.findAll().success(function(data) {
				$scope.categories = data;
				for (var i = 0; i < $scope.categories.length; i++) {
					$scope.categories[i].tracker = promiseTracker();
				}
			}).error(function() {
				AlertService.add('danger', 'Unable to load categories.');
			});
		}
		$scope.updateCategories();

		$scope.openImageModal = function(accessory) {
			ImageEditService.open(AccessoryService.imageUrl(accessory.id), AccessoryService.uploadImage.bind(null, accessory.id));
		}

		function updateAccessories() {
			AccessoryService.findAll().success(function(data) {
				$scope.accessories = data;
			}).error(function() {
				AlertService.add('danger', 'Unable to load accessories.');
			});
		}
		updateAccessories();

		GroupService.findAll().success(function(data) {
			$scope.groups = data;
		}).error(function() {
			AlertService.add('danger', 'Unable to load groups.');
		});

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
				controller: 'accessories.categoriesController',
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
				controller: 'accessories.editAccessoryController',
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
				controller: 'accessories.editAccessoryController',
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
	.controller('accessories.categoriesController', [
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
			}).success(function() {
				parentScope.updateCategories();
				$scope.categoryName = "";
			}).error(function() {
				AlertService.add('danger', 'Unable to save category');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

		$scope.deleteCategory = function(category) {
			var deferred = category.tracker.createPromise();
			CategoryService.delete(category.id).success(parentScope.updateCategories).error(function() {
				AlertService.add('danger', 'Unable to delete category.');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

	}])
	.controller('accessories.editAccessoryController', [
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

			callback(accessory).success(function() {
				AlertService.add('success', 'Successfully saved accessory.');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'Unable to save accessory.');
				$modalInstance.close();
			}).finally(deferred.resolve);
		}

	}]);
