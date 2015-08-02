angular.module('manage.controller.groups', [])
.controller('GroupsController', [
'$scope',
'$modal',
'AlertService',
'ReallyService',
'GroupService',
function($scope, $modal, AlertService, ReallyService, GroupService) {

	$scope.groups = [];

	function updateGroups() {
  		GroupService.findAll().then(function(data) {
  			$scope.groups = data;
  		}, function(data) {
  			AlertService.add('danger', 'Unable to load groups.');
  		});
  	}
  	updateGroups();

		$scope.addGroup = function() {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editGroup.html',
				controller: 'groups.EditGroupController',
				resolve: {
					callback: function() { return GroupService.create; },
					group: function() { return {}; }
				}
			});

			modal.result.then(updateGroups);

			return modal;
		};

		$scope.editGroup = function(group) {
			var modal = $modal.open({
				size: 'small',
				templateUrl: 'editGroup.html',
				controller: 'groups.EditGroupController',
				resolve: {
					callback: function() { return GroupService.update.bind(null, group.id); },
					group: function() { return angular.copy(group); }
				}
			});

			modal.result.then(updateGroups);

			return modal;
		}

		$scope.deleteGroup = function(group) {
			ReallyService.prompt({
				body: 'Are you sure you want to delete the group "' + group.name + '"?'
			}, GroupService.delete.bind(null, group.id)).result.then(function() {
				AlertService.add('success', 'Successfully deleted group.');
				updateGroups();
			});
		};

}])
.controller('groups.EditGroupController', [
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
		var deferred = $scope.tracker.createPromise();
		var promise = callback($scope.group).then(function() {
			AlertService.add('success', 'Successfully saved group!');
			$modalInstance.close();
		}, function() {
			AlertService.add('danger', 'An error occured while saving the group.');
			$modalInstance.dismiss();
		}).finally(deferred.resolve);
	}

}]);
