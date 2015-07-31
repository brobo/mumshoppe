angular.module('service.product', [])
	.factory('ProductService', ['$http', function($http) {
		return {

			findAll: function() {
				return $http.get('api/product');
			},
			create: function(product) {
				return $http.post('api/product/', product);
			},
			update: function(id, product) {
				return $http.put('api/product/' + id, product);
			},
			delete: function(id) {
				return $http.delete('api/product/' + id);
			}

		}
	}]);
