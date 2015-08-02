angular.module('service.accent-bow', [])
.factory('AccentBowService', ['$http', function($http) {

	function returnData(res) {
		return res.data;
	}

	return {
		findAll: function() {
			return $http.get('api/accentbow').then(returnData);
		},
		create: function(bow) {
			return $http.post('api/accentbow/', bow).then(returnData);
		},
		update: function(id, bow) {
			return $http.put('api/accentbow/' + id, bow).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/accentbow/' + id).then(returnData);
		},
		uploadImage: function(id, image) {
			var fd = new FormData();
			fd.append('file', image);
			return $http.post('api/accentbow/' + id + '/image', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).then(returnData);
		},
		imageUrl: function(id) {
			return 'api/accentbow/' + id + '/image';
		}
	};
}]);
