angular.module('service.bear', [])
.factory('BearService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {
		findAll: function() {
			return $http.get('api/bear').then(returnData);
		},
		create: function(bear) {
			return $http.post('api/bear/', bear).then(returnData);
		},
		update: function(id, bear) {
			return $http.put('api/bear/' + id, bear).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/bear/' + id).then(returnData);
		},
		uploadImage: function(id, image) {
			var fd = new FormData();
			fd.append('file', image);
			return $http.post('api/bear/' + id + '/image', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).then(returnData);
		},
		imageUrl: function(id) {
			return 'api/bear/' + id + '/image';
		}
	};

}]);
