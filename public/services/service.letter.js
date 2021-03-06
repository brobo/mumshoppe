angular.module('service.letter', [])
.factory('LetterService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}
	
	return {
		findAll: function() {
			return $http.get('api/letter').then(returnData);
		},
		create: function(letter) {
			return $http.post('api/letter/', letter).then(returnData);
		},
		update: function(id, letter) {
			return $http.put('api/letter/' + id, letter).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/letter/' + id).then(returnData);
		}
	}
}]);