angular.module('manage.controller.letters', [])
	.controller('LettersController', [
	'$scope',
	'$modal',
	'AlertService',
	'ReallyService',
	'LetterService',
	function($scope, $modal, AlertService, ReallyService, LetterService) {

		$scope.letters = [];

		function updateLetters() {
	  		LetterService.findAll().then(function(data) {
	  			$scope.letters = data;
	  		}, function(data) {
	  			AlertService.add('danger', 'Unable to load letters.');
	  		});
	  	}
	  	updateLetters();

  		$scope.addLetter = function() {
  			var modal = $modal.open({
  				size: 'small',
  				templateUrl: 'editLetter.html',
  				controller: 'letters.EditLetterController',
  				resolve: {
  					callback: function() { return LetterService.create; },
  					letter: function() { return {}; }
  				}
  			});

  			modal.result.then(updateLetters);

  			return modal;
  		};

  		$scope.editLetter = function(letter) {
  			var modal = $modal.open({
  				size: 'small',
  				templateUrl: 'editLetter.html',
  				controller: 'letters.EditLetterController',
  				resolve: {
  					callback: function() { return LetterService.update.bind(null, letter.id); },
  					letter: function() { return angular.copy(letter); }
  				}
  			});

  			modal.result.then(updateLetters);

  			return modal;
  		}

  		$scope.deleteLetter = function(letter) {
  			ReallyService.prompt({
  				body: 'Are you sure you want to delete the letter "' + letter.name + '"?'
  			}, LetterService.delete.bind(null, letter.id)).result.then(function() {
  				AlertService.add('success', 'Successfully deleted letter.');
  				updateLetters();
  			});
  		}

	}])
	.controller('letters.EditLetterController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'AlertService',
	'callback',
	'letter',
	function($scope, $modalInstance, promiseTracker, AlertService, callback, letter) {

		$scope.letter = letter;
		$scope.tracker = promiseTracker();

		$scope.cancel = function() {
			$modalInstance.dismiss();
		}

		$scope.save = function() {
			var deferred = $scope.tracker.createPromise();
			var promise = callback($scope.letter).then(function() {
				AlertService.add('success', 'Successfully saved letter!');
				$modalInstance.close();
			}, function() {
				AlertService.add('danger', 'An error occured while saving the letter.');
				$modalInstance.dismiss();
			}).finally(deferred.resolve);
		}

	}]);
