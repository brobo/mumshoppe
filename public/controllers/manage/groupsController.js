angular.module('manage.controller.groups', [])
	.controller('groupsController', [
	'$scope',
	'$modal',
	'AlertService',
	'ReallyService',
	'GroupService',
	function($scope, $modal, AlertService, ReallyService, GroupService) {

		function updateGroups() {
	  		GroupService.findAll().success(function(data) {
	  			$scope.groups = data;
	  		}).error(function(data) {
	  			AlertService.add('danger', 'Unable to load groups.');
	  		});
	  	}
	  	updateGroups();

  		$scope.openAddModal = function() {
  			var modal = $modal.open({
  				size: 'small',
  				templateUrl: 'editGroup.html',
  				controller: 'groups.editGroupController',
  				resolve: {
  					callback: function() { return GroupService.create; },
  					group: function() { return {}; }
  				}
  			});

  			modal.result.then(updateGroups);

  			return modal;
  		};

  		$scope.openEditModal = function(group) {
  			var modal = $modal.open({
  				size: 'small',
  				templateUrl: 'editGroup.html',
  				controller: 'groups.editGroupController',
  				resolve: {
  					callback: function() { return GroupService.update.bind(null, group.id); },
  					group: function() { return angular.copy(group); }
  				}
  			});

  			modal.result.then(updateGroups);

  			return modal;
  		}

  		$scope.delete = function(group) {
  			ReallyService.prompt({
  				body: 'Are you sure you want to delete the group "' + group.name + '"?'
  			}, GroupService.delete.bind(null, group.id)).result.then(function() {
  				AlertService.add('success', 'Successfully deleted group.');
  				updateGroups();
  			});
  		};

	}])
	.controller('groups.editGroupController', [
	'$scope',
	'$modalInstance',
	'promiseTracker',
	'AlertService',
	'callback',
	'group',
	function($scope, $modalInstance, promiseTracker, AlertService, callback, group) {

		$scope.group = group;
		$scope.tracker = promiseTracker();

		$scope.cancel = function() {
			$modalInstance.dismiss();
		}

		$scope.save = function() {
			var promise = callback($scope.group).success(function() {
				AlertService.add('success', 'Successfully saved group!');
				$modalInstance.close();
			}).error(function() {
				AlertService.add('danger', 'An error occured while saving the group.');
				$modalInstance.dismiss();
			});
			$scope.tracker.addPromise(promise);
		}

	}]);
