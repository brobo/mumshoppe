angular.module('service.mum', [])
	.factory('MumService', ['$http', function($http) {

		function returnData(response) {
			return response.data;
		}

		return {
			findAll: function() {
				return $http.get('api/mum').then(returnData);
			},
			create: function(mum) {
				return $http.post('api/mum/', mum).then(returnData);
			},
			update: function(id, mum) {
				return $http.put('api/mum/' + id, mum).then(returnData);
			},
			delete: function(id) {
				return $http.delete('api/mum/' + id).then(returnData);
			}
		}

	}]);
