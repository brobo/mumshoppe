describe('The backing controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.backings');
		module('service.alert');
		module('manage.service.image-edit');
		module('service.really');
		module('service.group');
		module('service.product');
		module('service.backing');
	});

	var $controller, $q, BackingsController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, GroupService, ProductService, BackingService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ImageEditService = sinon.stub($injector.get('ImageEditService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		GroupService = sinon.stub($injector.get('GroupService'));
		ProductService = sinon.stub($injector.get('ProductService'));
		BackingService = sinon.stub($injector.get('BackingService'));

		ProductService.findAll.returns($q.resolve([
			'product A',
			'product B',
			'product C'
		]));
		GroupService.findAll.returns($q.resolve([
			'group A',
			'group B',
			'group C'
		]));
		BackingService.findAll.returns($q.resolve([
			'backing A',
			'backing B',
			'backing C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			BackingsController = $injector.get('$controller')('BackingsController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				ProductService: ProductService,
				GroupService: GroupService,
				BackingService: BackingService
			});
		});
	}

	it('should find all products and backings', function() {
		getController();

		expect(GroupService.findAll.calledOnce).to.be.true;
		expect(BackingService.findAll.calledOnce).to.be.true;
	});

	it('should define the products and backings', function() {
		getController();
		$scope.$apply();

		expect($scope.products).to.be.ok.and.an('array').with.length(3);
		expect($scope.backings).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching products', function() {
		ProductService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.products).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should add an alert if an error occurs while fetching backings', function() {
		BackingService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.backings).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow the image to be edited', function() {
		getController();

		expect($scope.openImageModal).to.be.ok.and.a('function');
		$scope.openImageModal({ id: 1 });
		expect(ImageEditService.open.calledOnce).to.be.true;
	});

	it('should allow backings to be added', function() {
		getController();
		expect($scope.addBacking).to.be.ok.and.a('function');
	});

	it('should allow backings to be edited', function() {
		getController();
		expect($scope.editBacking).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteBacking({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteBacking({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteBacking({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false
	});

});

describe('The backing edit controller', function() {

	beforeEach(function() {
		module('manage.controller.backings');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, groups, products, backing, EditBackingController;

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
		products = [];
		backing = {};

		EditBackingController = $injector.get('$controller')('backings.EditBackingController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			groups: groups,
			products: products,
			backing: backing
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
