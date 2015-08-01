describe('The accent bow controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.accent-bows');
		module('service.alert');
		module('manage.service.image-edit');
		module('service.really');
		module('service.group');
		module('service.accent-bow');
	});

	var $controller, $q, AccentBowController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, GroupService, AccentBowService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ImageEditService = sinon.stub($injector.get('ImageEditService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		GroupService = sinon.stub($injector.get('GroupService'));
		AccentBowService = sinon.stub($injector.get('AccentBowService'));

		GroupService.findAll.returns($q.resolve([
			'group A',
			'group B',
			'group C'
		]));
		AccentBowService.findAll.returns($q.resolve([
			'accent bow A',
			'accent bow B',
			'accent bow C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			AccentBowController = $injector.get('$controller')('AccentBowsController', {
				$scope: $scope,
				$modal: $modal,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				GroupService: GroupService,
				AccentBowService: AccentBowService
			});
		});
	}

	it('should find all groups and accent bows', function() {
		getController();

		expect(GroupService.findAll.calledOnce).to.be.true;
		expect(AccentBowService.findAll.calledOnce).to.be.true;
	});

	it('should define the groups and bows', function() {
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(3);
		expect($scope.bows).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching groups', function() {
		GroupService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should add an alert if an error occurs while fetching bows', function() {
		AccentBowService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.bows).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow the image to be edited', function() {
		getController();

		expect($scope.openImageModal).to.be.ok.and.a('function');
		$scope.openImageModal({ id: 1 });
		expect(ImageEditService.open.calledOnce).to.be.true;
	});

	it('should allow bows to be added', function() {
		getController();
		expect($scope.addBow).to.be.ok.and.a('function');
	});

	it('should allow bows to be edited', function() {
		getController();
		expect($scope.editBow).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteBow({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteBow({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteBow({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false;
	});

});

describe('The accent bow edit controller', function() {

	beforeEach(function() {
		module('manage.controller.accent-bows');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, groups, bow, EditAccentBowController;

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
		bow = {};

		EditAccentBowController = $injector.get('$controller')('accent-bows.EditAccentBowController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			groups: groups,
			bow: bow
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
