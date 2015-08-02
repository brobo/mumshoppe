angular.module('service.backing', [])
.factory('BackingService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {

		findAll: function() {
			return $http.get('api/backing').then(returnData);
		},
		create: function(backing) {
			return $http.post('api/backing/', backing).then(returnData);
		},
		update: function(id, backing) {
			return $http.put('api/backing/' + id, backing).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/backing/' + id).then(returnData);
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
			}).then(returnData);
		}

	};

}]);
