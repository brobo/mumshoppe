angular.module('manage.controller.backings', [])
	.controller('BackingsController', [
	'$scope',
	'$modal',
	'$q',
	'AlertService',
	'ImageEditService',
	'ReallyService',
	'ProductService',
	'GroupService',
	'BackingService',
	function($scope, $modal, $q, AlertService, ImageEditService, ReallyService, ProductService, GroupService, BackingService) {

		function updateBackings() {
			$q.all([
				ProductService.findAll().success(function(data) {
					$scope.products = data;
				}),
				BackingService.findAll().success(function(data) {
					$scope.backings = data;
				})
			]).catch(function(data) {
				AlertService.add('danger', 'Unable to load backings.');
			});
		}
		updateBackings();

		$scope.openImageModal = function(backing) {
			ImageEditService.open(BackingService.imageUrl(backing.id), BackingService.uploadImage.bind(null, backing.id));
		}

		var groups;
		GroupService.findAll().success(function(data) {
			groups = data;
		});

		$scope.addBacking = function(product) {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editBacking.html',
				controller: 'backings.EditBackingController',
				resolve: {
					callback: function() { return BackingService.create; },
					groups: function() { return groups; },
					backing: function() { 
						return {
							product: product.id
						}; 
					},
					products: function() { return $scope.products; }
				}
			});
			modal.result.then(updateBackings);
		}

		$scope.editBacking = function(backing) {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editBacking.html',
				controller: 'backings.EditBackingController',
				resolve: {
					callback: function() { return BackingService.update.bind(null, backing.id); },
					groups: function() { return groups; },
					backing: function() {
						var copy = angular.copy(backing);
						copy.product = backing.product.id;
						copy.group = backing.group.id;
						return copy;
					},
					products: function() { return $scope.products; }
				}
			});
			modal.result.then(updateBackings);
		}

		$scope.deleteBacking = function(backing) {
			ReallyService.prompt({
				body: 'Are you sure you want to delete the backing "' + backing.name + '"?'
			}, BackingService.delete.bind(null, backing.id)).result.then(function() {
				AlertService.add('success', 'Successfully deleted backing.');
				updateBackings();
			});
		}

	}])
	.controller('backings.EditBackingController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'AlertService',
	'callback',
	'groups',
	'products',
	'backing',
	function($scope, $modalInstance, promiseTracker, AlertService, callback, groups, products, backing) {

		$scope.backing = backing;
		$scope.groups = groups;
		$scope.products = products;

		$scope.tracker = promiseTracker();

		$scope.cancel = $modalInstance.dismiss;

		$scope.save = function() {
			var deferred = $scope.tracker.createPromise();
			var promise = callback($scope.backing).success(function() {
				AlertService.add('success', 'Successfully saved backing!');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'Unable to saving backing.');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

	}]);
