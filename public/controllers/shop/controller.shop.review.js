angular.module('shop.controller.review', [])
.controller('ReviewController', [
'$scope',
'AlertService',
'CategoryService',
function($scope, AlertService, CategoryService) {

	$scope.categories = [];

	CategoryService.findAll().then(function(data) {
		$scope.categories = data;

	}, function() {
		AlertService.add('danger', 'Unable to load accessory categories!');
	});

}]);
