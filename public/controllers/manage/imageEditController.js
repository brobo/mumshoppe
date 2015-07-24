angular.module('manage.controller.imageEdit', [])
	.controller('imageEditController', [
	'$scope',
	'$modalInstance',
	'AlertService',
	'promiseTracker',
	'imageUrl',
	'uploadAction',
	function($scope, $modalInstance, AlertService, promiseTracker, imageUrl, uploadAction) {

		$scope.tracker = promiseTracker();
		$scope.cancel = $modalInstance.dismiss;
		$scope.imageUrl = imageUrl;

		$scope.dataURI;

		$scope.save = function() {
			var bytestring;
			if ($scope.dataURI.split(',')[0].indexOf('base64') >= 0) {
				byteString = atob($scope.dataURI.split(',')[1]);
			} else {
				byteString = unescoape($scope.dataURI.split(',')[1]);
			}
			var mime = $scope.dataURI.split(',')[0].split(':')[1].split(';')[0];

			var arr = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				arr[i] = byteString.charCodeAt(i);
			}
			var file = new Blob([arr], {type: mime});

			var deferred = $scope.tracker.createPromise();
			uploadAction(file).success(function() {
				AlertService.add('success', 'Successfully uploaded image.');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'An error occured while uploading the image.');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

		$scope.onUpload = function(event) {
			var reader = new FileReader();
			reader.onloadend = function(event) {
				var img = new Image();
				img.src = reader.result;
				img.onload = function() {
					var max = 250;
					var imageWidth = img.width;
					var imageHeight = img.height;

					var factor = max / Math.max(img.width, img.height);
					if (factor < 1) {
						imageWidth = img.width * factor;
						imageHeight = img.height * factor;
					}

					var canvas = document.getElementById('newImageCanvas');
					canvas.width = imageWidth;
					canvas.height= imageHeight;

					var ctx = canvas.getContext('2d');
					ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

					$scope.dataURI = canvas.toDataURL('image/png');
				}
			}
			reader.readAsDataURL(event.target.files[0]);
		}

	}]);
