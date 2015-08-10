angular.module('service.order', [])
.factory('OrderService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {
		findById: function(id) {
			return $http.get('api/order/' + id).then(returnData);
		},
		create: function(customerId, mumId) {
			return $http.post('api/order/' + customerId + '/' + mumId).then(returnData);
		}
	};

}]);
