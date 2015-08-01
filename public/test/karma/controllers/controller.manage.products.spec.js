describe('The products controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.products');
		module('service.alert');
		module('service.really');
		module('service.product');
	});

	var $controller, $q, ProductsController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, ProductService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		ProductService = sinon.stub($injector.get('ProductService'));

		ProductService.findAll.returns($q.resolve([
			'product A',
			'product B',
			'product C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			ProductsController = $injector.get('$controller')('ProductsController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				ProductService: ProductService
			});
		});
	}

	it('should find all products', function() {
		getController();

		expect(ProductService.findAll.calledOnce).to.be.true;
	});

	it('should define the products', function() {
		getController();
		$scope.$apply();

		expect($scope.products).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching products', function() {
		ProductService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.products).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow products to be added', function() {
		getController();
		expect($scope.addProduct).to.be.ok.and.a('function');
	});

	it('should allow products to be edited', function() {
		getController();
		expect($scope.editProduct).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteProduct({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteProduct({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteProduct({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false;
	});

});

describe('The product edit controller', function() {

	beforeEach(function() {
		module('manage.controller.products');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, product, EditProductController;

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
		product = {};

		EditProductController = $injector.get('$controller')('products.EditProductController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			product: product
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
