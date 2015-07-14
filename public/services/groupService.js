angular.module('service.group', [])
	.factory('GroupService', ['$http', function($http) {

		return {

			findAll: function() {
				return $http.get('api/group');
			},
			create: function(group) {
				return $http.post('api/group/', group);
			},
			update: function(id, group) {
				return $http.put('api/group/' + id, group);
			},
			delete: function(id) {
				return $http.delete('api/group/' + id);
			}

		}

	}]);