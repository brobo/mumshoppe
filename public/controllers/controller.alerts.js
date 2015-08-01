angular.module('controller.alerts', [])
	.controller('AlertsController', ['$scope', 'AlertService', function($scope, AlertService) {
		$scope.closeAlert = AlertService.close;
	}]);