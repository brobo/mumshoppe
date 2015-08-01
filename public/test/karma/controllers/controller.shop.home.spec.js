describe('The home controller', function() {

	beforeEach(function() {
		module('shop.controller.home');
		module('ui.bootstrap');
		module('service.alert');
		module('service.product');
		module('service.group');
		module('service.backing');
		module('service.mum');
	});

	var $controller;

	var HomeController, $scope, $modal, $q, AlertService, GroupService, 
		ProductService, BackingService, MumService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');

		$scope = $injector.get('$rootScope').$new();
		$modal = sinon.stub($injector.get('$modal'));
		$q = $injector.get('$q');
		AlertService = sinon.stub($injector.get('AlertService'));
		GroupService = sinon.stub($injector.get('GroupService'));
		ProductService = sinon.stub($injector.get('ProductService'));
		BackingService = sinon.stub($injector.get('BackingService'));
		MumService = sinon.stub($injector.get('MumService'));

		GroupService.findAll.returns($q.defer().promise);
		ProductService.findAll.returns($q.defer().promise);
		BackingService.findAll.returns($q.defer().promise);
	}));

	function getController() {
		HomeController = $controller('HomeController', {
			$scope: $scope,
			$modal: $modal,
			$q: $q,
			AlertService: AlertService,
			GroupService: GroupService,
			ProductService: ProductService,
			BackingService: BackingService,
			MumService: MumService
		});
	}


	it('should fetch groups, products, and backings', function() {
		getController();

		expect(GroupService.findAll.calledOnce).to.be.true;
		expect(ProductService.findAll.calledOnce).to.be.true;
		expect(BackingService.findAll.calledOnce).to.be.true;
	});

	it('should display an error on load fail', function() {
		GroupService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow mums to be created', function() {
		getController();

		expect($scope.createMum.calledOnce).to.be.true;
	});

});
