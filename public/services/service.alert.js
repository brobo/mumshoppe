angular.module('service.alert', [])
.factory('AlertService', ['$rootScope', function($rootScope) {
	$rootScope.alerts = [];
	var alertsService = {
		add: function(type, message) {
			$rootScope.alerts.splice(0, 0, {
				type: type,
				message: message,
				close: function() {
					return alertsService.close(this);
				}
			});
			return $rootScope.alerts[0];
		},
		close: function(alert) {
			var index = $rootScope.alerts.indexOf(alert);
			return $rootScope.alerts.splice(index, 1);
		},
		clear: function() {
			$rootScope.alerts = [];
		}
	};
	return alertsService;
}]);
