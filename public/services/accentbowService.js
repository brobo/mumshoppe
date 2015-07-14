angular.module('service.accentbow', [])
	.factory('AccentBowService', ['$http', function($http) {
		return {

			findAll: function() {
				return $http.get('api/accentbow');
			},
			create: function(bow) {
				return $http.post('api/accentbow/', bow);
			},
			update: function(id, bow) {
				return $http.put('api/accentbow/' + id, bow);
			},
			delete: function(id) {
				return $http.delete('api/accentbow/' + id);
			}

		}
	}]);
