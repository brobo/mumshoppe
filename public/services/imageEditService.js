angular.module('manage.service.imageEdit', [])
	.factory('ImageEditService', [
	'$http', 
	'$modal',
	function($http, $modal) {

		return {
			open: function(imageUrl, uploadAction) {
				return $modal.open({
					size: 'small',
					controller: 'imageEditController',
					templateUrl: 'res/imageEdit.html',
					resolve: {
						imageUrl: function() { return imageUrl; },
						uploadAction: function() { return uploadAction; }
					}
				});
			}
		}

	}]);
