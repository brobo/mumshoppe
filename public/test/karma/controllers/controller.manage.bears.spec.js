describe('The bear controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.bears');
		module('service.alert');
		module('manage.service.image-edit');
		module('service.really');
		module('service.group');
		module('service.bear');
	});

	var $controller, $q, AccentBowController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, GroupService, BearService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ImageEditService = sinon.stub($injector.get('ImageEditService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		GroupService = sinon.stub($injector.get('GroupService'));
		BearService = sinon.stub($injector.get('BearService'));

		GroupService.findAll.returns($q.resolve([
			'group A',
			'group B',
			'group C'
		]));
		BearService.findAll.returns($q.resolve([
			'bear A',
			'bear B',
			'bear C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			AccentBowController = $injector.get('$controller')('BearsController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				GroupService: GroupService,
				BearService: BearService
			});
		});
	}

	it('should find all groups and bears', function() {
		getController();

		expect(GroupService.findAll.calledOnce).to.be.true;
		expect(BearService.findAll.calledOnce).to.be.true;
	});

	it('should define the groups and bears', function() {
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(3);
		expect($scope.bears).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching groups', function() {
		GroupService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should add an alert if an error occurs while fetching bears', function() {
		BearService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.bears).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should determine which groups a bear belongs to', function() {
		getController();
		var bear = {
			groups: [
				{ id: 1 },
				{ id: 2 },
				{ id: 5 }
			]
		};

		expect($scope.hasGroup).to.be.ok.and.a('function');
		expect($scope.hasGroup(bear, { id: 1 })).to.be.true;
		expect($scope.hasGroup(bear, { id: 2 })).to.be.true;
		expect($scope.hasGroup(bear, { id: 3 })).to.be.false;
		expect($scope.hasGroup(bear, { id: 4 })).to.be.false;
		expect($scope.hasGroup(bear, { id: 5 })).to.be.true;
		expect($scope.hasGroup(bear, { id: 6 })).to.be.false;
	});

	it('should allow the image to be edited', function() {
		getController();

		expect($scope.openImageModal).to.be.ok.and.a('function');
		$scope.openImageModal({ id: 1 });
		expect(ImageEditService.open.calledOnce).to.be.true;
	});

	it('should allow bears to be added', function() {
		getController();
		expect($scope.addBear).to.be.ok.and.a('function');
	});

	it('should allow bears to be edited', function() {
		getController();
		expect($scope.editBear).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteBear({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteBear({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteBear({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false;
	});

});

describe('The bear edit controller', function() {

	beforeEach(function() {
		module('manage.controller.bears');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, groups, bear, EditBearController;

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
		groups = [];
		bear = {};

		EditBearController = $injector.get('$controller')('bears.EditBearController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			groups: groups,
			bear: bear
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

	it('should correctly map a bear\'s groups', function() {
		$scope.bear = {
			groups: {
				1: true,
				2: true,
				3: false,
				5: true
			}
		};
		callback.returns($q.defer().promise);

		$scope.save();
		expect(callback.called).to.be.true;
		var arg = callback.firstCall.args[0];
		expect(arg).to.have.property('groups').that.is.ok.and.an('array')
			.with.members(['1', '2', '5']).which.not.includes.members(['3', '4', '6']);
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
