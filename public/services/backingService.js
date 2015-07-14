angular.module('service.backing', [])
	.factory('BackingService', ['$http', function($http) {

		return {

			findAll: function() {
				return $http.get('api/backing');
			},
			create: function(backing) {
				return $http.post('api/backing/', backing);
			},
			update: function(id, backing) {
				return $http.put('api/backing/' + id, backing);
			},
			delete: function(id) {
				return $http.delete('api/backing/' + id);
			}

		};

	}]);
