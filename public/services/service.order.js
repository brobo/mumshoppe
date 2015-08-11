angular.module('service.order', [])
.factory('OrderService', ['$http', '$cookies', function($http, $cookies) {

	function returnData(response) {
		return response.data;
	}

	return {
		findById: function(id) {
			return $http.get('api/order/' + id).then(returnData);
		},
		create: function(customerId, mumId) {
			return $http.post('api/order/' + customerId + '/' + mumId).then(returnData);
		},
		beginPayFlow: function(orderId) {
			return $http.get('api/order/' + orderId + '/pay').then(returnData).then(function(data) {
				$cookies.put('access_token', 'Bearer ' + data.access_token.access_token);
				$cookies.put('payment_id', data.payment_id);
				return data;
			});
		},
		endPayFlow: function(orderId, payerId) {
			return $http.post('api/order/' + orderId + '/pay/', {
				payer_id: payerId,
				access_token: $cookies.get('access_token'),
				payment_id: $cookies.get('payment_id')
			}).then(returnData).then(function(data) {
				$cookies.remove('access_token');
				$cookies.remove('payment_id');
				return data;
			});
		}
	};

}]);
