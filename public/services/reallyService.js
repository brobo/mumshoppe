angular.module('service.really', ['ui.bootstrap'])
	.factory('ReallyService', ['$rootScope', '$modal', function($rootScope, $modal) {
		var defaults = {
			head: 'Really?',
			body: 'Please confirm that this something you want to do.',
			yes: 'OK',
			no: 'Cancel'
		};
		return {
			prompt: function(data, callback) {
				for (attr in defaults) {
					data[attr] = data[attr] || defaults[attr];
				}

				return modalInstance = $modal.open({
					templateUrl: 'res/really.html',
					controller: 'ReallyController',
					resolve: {
						data: function() { return data; },
						callback: function() { return callback; }
					}
				});
			}
		};
	}]);
