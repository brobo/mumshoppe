angular.module('service.ribbon', [])
.factory('RibbonService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {
		findById: function(id) {
			return $http.get('api/ribbon/' + id).then(returnData);
		},
		create: function(ribbon) {
			return $http.post('api/ribbon/', ribbon).then(returnData);
		},
		update: function(id, ribbon) {
			return $http.put('api/ribbon/' + id, ribbon).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/ribbon/' + id).then(returnData);
		}
	};

}]);
