angular.module('service.customer', [])
.factory('CustomerService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {
		register: function(customer) {
			return $http.post('api/customer/', customer).then(returnData);
		},
		login: function(customer) {
			return $http.put('api/customer/login', customer).then(returnData);
		}
	};

}]);
