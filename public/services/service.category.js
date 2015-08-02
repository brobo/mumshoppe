angular.module('service.category', [])
.factory('CategoryService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}
	
	return {
		findAll: function() {
			return $http.get('api/category').then(returnData);
		},
		create: function(category) {
			return $http.post('api/category/', category).then(returnData);
		},
		update: function(id, category) {
			return $http.put('api/category/' + id, category).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/category/' + id).then(returnData);
		}
	}

}]);
