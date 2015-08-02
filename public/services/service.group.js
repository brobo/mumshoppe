angular.module('service.group', [])
	.factory('GroupService', ['$http', function($http) {

		function returnData(response) {
			return response.data;
		}

		return {

			findAll: function() {
				return $http.get('api/group').then(returnData);
			},
			create: function(group) {
				return $http.post('api/group/', group).then(returnData);
			},
			update: function(id, group) {
				return $http.put('api/group/' + id, group).then(returnData);
			},
			delete: function(id) {
				return $http.delete('api/group/' + id).then(returnData);
			}

		}

	}]);