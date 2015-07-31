angular.module('manage.service.image-edit', [])
	.factory('ImageEditService', [
	'$http', 
	'$modal',
	function($http, $modal) {

		return {
			open: function(imageUrl, uploadAction) {
				return $modal.open({
					size: 'small',
					controller: 'imageEditController',
					templateUrl: 'res/image-edit.html',
					resolve: {
						imageUrl: function() { return imageUrl; },
						uploadAction: function() { return uploadAction; }
					}
				});
			}
		}

	}]);
