angular.module('service.backing', [])
	.factory('BackingService', ['$http', function($http) {

		return {

			findAll: function() {
				return $http.get('api/backing');
			},
			create: function(backing) {
				return $http.post('api/backing/', backing);
			},
			update: function(id, backing) {
				return $http.put('api/backing/' + id, backing);
			},
			delete: function(id) {
				return $http.delete('api/backing/' + id);
			},
			imageUrl: function(id) {
				return 'api/backing/' + id + '/image';
			},
			uploadImage: function(id, image) {
				var fd = new FormData();
				fd.append('file', image);
				return $http.post('api/backing/' + id + '/image', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			}

		};

	}]);
