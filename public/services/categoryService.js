angular.module('service.category', [])
	.factory('CategoryService', ['$http', function($http) {
		
		return {
			findAll: function() {
				return $http.get('api/category');
			},
			create: function(category) {
				return $http.post('api/category/', category);
			},
			update: function(id, category) {
				return $http.put('api/category/' + id, category);
			},
			delete: function(id) {
				return $http.delete('api/category/' + id);
			}
		}

	}]);
