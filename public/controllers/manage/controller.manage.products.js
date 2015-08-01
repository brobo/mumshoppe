angular.module('manage.controller.products', [])
	.controller('ProductsController', [
	'$scope',
	'$modal',
	'AlertService',
	'ReallyService',
	'ProductService',
	function($scope, $modal, AlertService, ReallyService, ProductService) {

		$scope.products = [];

		function updateProducts() {
			ProductService.findAll().then(function(data) {
				$scope.products = data;
			}, function(data) {
				AlertService.add('danger', 'Unable to load products.');
			});
		}
		updateProducts();

		$scope.addProduct = function() {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editProduct.html',
				controller: 'products.EditProductController',
				resolve: {
					callback: function() { return ProductService.create; },
					product: function() { return {}; }
				}
			});

			modal.result.then(updateProducts);

			return modal;
		};

		$scope.editProduct = function(product) {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editProduct.html',
				controller: 'products.EditProductController',
				resolve: {
					callback: function() { return ProductService.update.bind(null, product.id); },
					product: function() { return angular.copy(product); }
				}
			});

			modal.result.then(updateProducts);

			return modal;
		};

		$scope.deleteProduct = function(product) {
			ReallyService.prompt({
				body: 'Are you sure you want to delete the product "' + product.name + '"?'
			}, ProductService.delete.bind(null, product.id)).result.then(function() {
				AlertService.add('success', 'Successfully deleted group.');
				updateProducts();
			});
		};

	}])
	.controller('products.EditProductController', [
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
			var deferred = $scope.tracker.createPromise();
			var promise = callback($scope.product).then(function() {
				AlertService.add('success', 'Successfully saved product!');
				$modalInstance.close();
			}, function() {
				AlertService.add('danger', 'An error occured while saving the product.');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

	}]);
