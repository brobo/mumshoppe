angular.module('service.accessory', [])
	.factory('AccessoryService', ['$http', function($http) {

		return {
			findAll: function() {
				return $http.get('api/accessory');
			},
			create: function(accessory) {
				return $http.post('api/accessory/', accessory);
			},
			update: function(id, accessory) {
				return $http.put('api/accessory/' + id, accessory);
			},
			delete: function(id) {
				return $http.delete('api/accessory/' + id);
			},
			uploadImage: function(id, image) {
				var fd = new FormData();
				fd.append('file', image);
				return $http.post('api/accessory/' + id + '/image', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				});
			},
			imageUrl: function(id) {
				return 'api/accessory/' + id + '/image';
			}
		};
		
	}]);
