angular.module('service.product', [])
	.factory('ProductService', ['$http', function($http) {

		function returnData(response) {
			return response.data;
		}

		return {

			findAll: function() {
				return $http.get('api/product').then(returnData);
			},
			create: function(product) {
				return $http.post('api/product/', product).then(returnData);
			},
			update: function(id, product) {
				return $http.put('api/product/' + id, product).then(returnData);
			},
			delete: function(id) {
				return $http.delete('api/product/' + id).then(returnData);
			}

		}
	}]);
