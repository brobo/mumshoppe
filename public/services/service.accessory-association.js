angular.module('service.accessory-association', [])
.factory('AccessoryAssociationService', ['$http', function($http) {

	function returnData(response) {
		return response.data;
	}

	return {
		create: function(association) {
			return $http.post('api/association/', association).then(returnData);
		},
		update: function(id, association) {
			return $http.put('api/association/' + id, association).then(returnData);
		},
		delete: function(id) {
			return $http.delete('api/association/' + id).then(returnData);
		}
	};

}]);
