angular.module('shop.controller.home', [])
	.controller('HomeController', [
	'$scope',
	'$modal',
	'$q',
	'AlertService',
	'GroupService',
	'ProductService',
	'BackingService',
	'MumService',
	function($scope, $modal, $q, AlertService, GroupService, ProductService, BackingService, MumService) {

		$scope.groups = [];
		$scope.products = [];
		$scope.backings = [];

		$q.all([
			GroupService.findAll().then(function(data) {
				$scope.groups = data;
			}),
			ProductService.findAll().then(function(data) {
				$scope.products = data;
			}),
			BackingService.findAll().then(function(data) {
				$scope.backings = data;
				for (var i = 0; i < $scope.backings.length; i++) {
					$scope.backings[i].imageUrl = BackingService.imageUrl($scope.backings[i].id);
				}

			})
		]).catch(function() {
			AlertService.add('danger', 'Failed to load mum creation data. Please refresh and try again.');
		});

		function updateMums() {
			MumService.findAll().then(function(data) {
				$scope.mums = data;
			}, function() {
				AlertService.add('danger', 'Failed to load mums.');
			});
		}
		updateMums();
		

		$scope.createMum = function() {
			return $modal.open({
				size: 'large',
				templateUrl: 'createMum.html',
				controller: 'home.CreateController',
				resolve: {
					groups: function() { return $scope.groups; },
					products: function() { return $scope.products; },
					backings: function() { return $scope.backings; }
				}
			});
		};

	}])
	.controller('home.CreateController', [
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
			}).then(function() {
				console.log('Success!');
			}, function(error) {
				console.error(error);
			}).finally(deferred.resolve);
		}

	}]);
