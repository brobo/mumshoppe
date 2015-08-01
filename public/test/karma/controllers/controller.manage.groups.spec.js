describe('The groups controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.groups');
		module('service.alert');
		module('service.really');
		module('service.group');
	});

	var $controller, $q, GroupsController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, GroupService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		GroupService = sinon.stub($injector.get('GroupService'));

		GroupService.findAll.returns($q.resolve([
			'group A',
			'group B',
			'group C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			GroupsController = $injector.get('$controller')('GroupsController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				GroupService: GroupService
			});
		});
	}

	it('should find all groups', function() {
		getController();

		expect(GroupService.findAll.calledOnce).to.be.true;
	});

	it('should define the groups', function() {
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching groups', function() {
		GroupService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow groups to be added', function() {
		getController();
		expect($scope.addGroup).to.be.ok.and.a('function');
	});

	it('should allow groups to be edited', function() {
		getController();
		expect($scope.editGroup).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteGroup({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteGroup({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteGroup({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false;
	});

});

describe('The group edit controller', function() {

	beforeEach(function() {
		module('manage.controller.groups');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, group, EditGroupController;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		callback = sinon.stub().returns($q.defer().promise);
		group = {};

		EditGroupController = $injector.get('$controller')('groups.EditGroupController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			group: group
		});
	}));

	it('should have cancel and save methods', function() {
		expect($scope.cancel).to.be.ok.and.a('function');
		expect($scope.save).to.be.ok.and.a('function');
	});

	it('should cancel the request', function() {
		$scope.cancel();

		expect($modalInstance.dismiss.called).to.be.true;
	});

	it('should display a success or error message, as appropriate', function() {
		callback.onFirstCall().returns($q.resolve());
		$scope.save();
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');
		expect($modalInstance.close.called).to.be.true;

		AlertService.add.reset();

		callback.onSecondCall().returns($q.reject());
		$scope.save();
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
		expect($modalInstance.close.called).to.be.true;
	});

});
