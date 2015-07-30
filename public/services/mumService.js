angular.module('service.mum', [])
	.factory('MumService', ['$http', function($http) {

		return {
			findAll: function() {
				return $http.get('api/mum');
			},
			create: function(mum) {
				return $http.post('api/mum/', mum);
			},
			update: function(id, mum) {
				return $http.put('api/mum/' + id, mum);
			},
			delete: function(id) {
				return $http.delete('api/mum/' + id);
			}
		}

	}]);
