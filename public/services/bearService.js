angular.module('service.bear', [])
	.factory('BearService', ['$http', function($http) {

		return {
			findAll: function() {
				return $http.get('api/bear');
			},
			create: function(bear) {
				return $http.post('api/bear/', bear);
			},
			update: function(id, bear) {
				return $http.put('api/bear/' + id, bear);
			},
			delete: function(id) {
				return $http.delete('api/bear/' + id);
			}
		};

	}]);
