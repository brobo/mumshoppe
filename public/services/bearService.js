angular.module('service.bear', [])
	.factory('BearService', ['$http', function($http) {

		return {
			findAll: function() {
				return $http.get('api/bear');
			},
			create: function(bear) {
				return $http.post('api/bear/', bear);
			},
			update: function(id, bear) {
				return $http.put('api/bear/' + id, bear);
			},
			delete: function(id) {
				return $http.delete('api/bear/' + id);
			},
			uploadImage: function(id, image) {
				var fd = new FormData();
				fd.append('file', image);
				return $http.post('api/bear/' + id + '/image', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			},
			imageUrl: function(id) {
				return 'api/bear/' + id + '/image';
			}
		};

	}]);
