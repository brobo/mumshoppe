angular.module('service.letter', [])
	.factory('LetterService', ['$http', function($http) {
		
		return {
			findAll: function() {
				return $http.get('api/letter');
			},
			create: function(letter) {
				return $http.post('api/letter/', letter);
			},
			update: function(id, letter) {
				return $http.put('api/letter/' + id, letter);
			},
			delete: function(id) {
				return $http.delete('api/letter/' + id);
			}
		}
	}]);