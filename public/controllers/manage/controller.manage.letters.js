angular.module('manage.controller.letters', [])
	.controller('LettersController', [
	'$scope',
	'$modal',
	'AlertService',
	'ReallyService',
	'LetterService',
	function($scope, $modal, AlertService, ReallyService, LetterService) {

		function updateLetters() {
	  		LetterService.findAll().success(function(data) {
	  			$scope.letters = data;
	  		}).error(function(data) {
	  			AlertService.add('danger', 'Unable to load letters.');
	  		});
	  	}
	  	updateLetters();

  		$scope.openAddModal = function() {
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

  		$scope.openEditModal = function(letter) {
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

  		$scope.delete = function(letter) {
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
			var promise = callback($scope.letter).success(function() {
				AlertService.add('success', 'Successfully saved letter!');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'An error occured while saving the letter.');
				$modalInstance.dismiss();
			});
			$scope.tracker.addPromise(promise);
		}

	}]);
