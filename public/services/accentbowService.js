angular.module('service.accentbow', [])
	.factory('AccentBowService', ['$http', function($http) {
		return {

			findAll: function() {
				return $http.get('api/accentbow');
			},
			create: function(bow) {
				return $http.post('api/accentbow/', bow);
			},
			update: function(id, bow) {
				return $http.put('api/accentbow/' + id, bow);
			},
			delete: function(id) {
				return $http.delete('api/accentbow/' + id);
			},
			uploadImage: function(id, image) {
				var fd = new FormData();
				fd.append('file', image);
				return $http.post('api/accentbow/' + id + '/image', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			},
			imageUrl: function(id) {
				return 'api/accentbow/' + id + '/image';
			}
		};
	}]);
