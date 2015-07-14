angular.module('manage.controller.products', [])
	.controller('productsController', [
	'$scope',
	'$modal',
	'AlertService',
	'ReallyService',
	'ProductService',
	function($scope, $modal, AlertService, ReallyService, ProductService) {

		function updateProducts() {
			ProductService.findAll().success(function(data) {
				$scope.products = data;
			}).error(function(data) {
				AlertService.add('danger', 'Unable to load products.');
			});
		}
		updateProducts();

		$scope.openAddModal = function() {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editProduct.html',
				controller: 'products.editProductController',
				resolve: {
					callback: function() { return ProductService.create; },
					product: function() { return {}; }
				}
			});

			modal.result.then(updateProducts);

			return modal;
		};

		$scope.openEditModal = function(product) {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editProduct.html',
				controller: 'products.editProductController',
				resolve: {
					callback: function() { return ProductService.update.bind(null, product.id); },
					product: function() { return angular.copy(product); }
				}
			});

			modal.result.then(updateProducts);

			return modal;
		};

		$scope.delete = function(product) {
			ReallyService.prompt({
				body: 'Are you sure you want to delete the product "' + product.name + '"?'
			}, ProductService.delete.bind(null, product.id)).result.then(function() {
				AlertService.add('success', 'Successfully deleted group.');
				updateProducts();
			});
		};

	}])
	.controller('products.editProductController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'AlertService',
	'callback',
	'product',
	function($scope, $modalInstance, promiseTracker, AlertService, callback, product) {
		
		$scope.product = product;
		$scope.tracker = promiseTracker();

		$scope.cancel = $modalInstance.dismiss;

		$scope.save = function() {
			var promise = callback($scope.product).success(function() {
				AlertService.add('success', 'Successfully saved product!');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'An error occured while saving the product.');
				$modalInstance.dismiss();
			});
			$scope.tracker.addPromise(promise);
		}

	}]);
