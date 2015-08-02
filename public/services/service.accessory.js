angular.module('service.accessory', [])
	.factory('AccessoryService', ['$http', function($http) {

		function returnData(response) {
			return response.data;
		}

		return {
			findAll: function() {
				return $http.get('api/accessory').then(returnData);
			},
			create: function(accessory) {
				return $http.post('api/accessory/', accessory).then(returnData);
			},
			update: function(id, accessory) {
				return $http.put('api/accessory/' + id, accessory).then(returnData);
			},
			delete: function(id) {
				return $http.delete('api/accessory/' + id).then(returnData);
			},
			uploadImage: function(id, image) {
				var fd = new FormData();
				fd.append('file', image);
				return $http.post('api/accessory/' + id + '/image', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(returnData);
			},
			imageUrl: function(id) {
				return 'api/accessory/' + id + '/image';
			}
		};
		
	}]);
