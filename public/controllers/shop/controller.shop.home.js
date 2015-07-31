angular.module('shop.controller.home', [])
	.controller('HomeController', [
	'$scope',
	'$modal',
	'GroupService',
	'ProductService',
	'BackingService',
	'MumService',
	function($scope, $modal, GroupService, ProductService, BackingService, MumService) {

		GroupService.findAll().success(function(data) {
			$scope.groups = data;
		});
		ProductService.findAll().success(function(data) {
			$scope.products = data;
		});
		BackingService.findAll().success(function(data) {
			$scope.backings = data;
			for (var i = 0; i < $scope.backings.length; i++) {
				$scope.backings[i].imageUrl = BackingService.imageUrl($scope.backings[i].id);
			}

		});

		$scope.createMum = function() {
			return $modal.open({
				size: 'large',
				templateUrl: 'createMum.html',
				controller: 'home.createController',
				resolve: {
					groups: function() { return $scope.groups; },
					products: function() { return $scope.products; },
					backings: function() { return $scope.backings; }
				}
			});
		};

	}])
	.controller('home.createController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'MumService',
	'groups',
	'products',
	'backings',
	function($scope, $modalInstance, promiseTracker, MumService, groups, products, backings) {

		$scope.groups = groups;
		$scope.products = products;
		$scope.backings = backings;

		for (var i = 0; i < $scope.backings.length; i++) {
			$scope.backings[i].tracker = promiseTracker();
		}

		$scope.create = function(backing) {
			var deferred = backing.tracker.createPromise();
			MumService.create({
				backing: backing.id
			}).success(function() {
				console.log('Success!');
			}).error(function(error) {
				console.error(error);
			}).finally(deferred.resolve);
		}

	}]);
