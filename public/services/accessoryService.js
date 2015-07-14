angular.module('service.accessory', [])
	.factory('AccessoryService', ['$http', function($http) {

		return {
			findAll: function() {
				return $http.get('api/accessory');
			},
			create: function(accessory) {
				return $http.post('api/accessory/', accessory);
			},
			update: function(id, accessory) {
				return $http.put('api/accessory/' + id, accessory);
			},
			delete: function(id) {
				return $http.delete('api/accessory/' + id);
			}
		};
		
	}]);
