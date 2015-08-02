describe('The customize controller', function() {

	beforeEach(function() {
		module('shop.controller.customize');
		module('service.alert');
		module('service.mum');
		module('ajoslin.promise-tracker');
	});

	var $controller, $q;
	var CustomizeController, $scope, $stateParams, 
		promiseTracker, AlertService, MumService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$stateParams = { mum_id: 7 };
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		MumService = sinon.stub($injector.get('MumService'));

		MumService.findById.returns($q.resolve({
			id: 7
		}));
	}));

	function getController() {
		CustomizeController = $controller('CustomizeController', {
			$scope: $scope,
			$stateParams: $stateParams,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			MumService: MumService
		});
	}

	it('should load the mum_id', function() {
		getController();
		expect($scope.mum_id).to.be.ok.and.equals($stateParams.mum_id);
	});

	it('should find a single mum', function() {
		getController();

		expect(MumService.findById.calledOnce).to.be.true;
		expect(MumService.findById.firstCall.args).to.have.deep.property('[0]', $stateParams.mum_id);
	});

	it('should create a promise for the mum', function() {
		getController();

		expect($scope.mumPromise).to.be.ok.and.have.property('then').that.is.a('function');
	});

	it('should display an error if the mum loading fails', function() {
		MumService.findById.returns($q.reject());
		getController();
		$scope.$apply();

		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow mums to be saved', function() {
		getController();
		expect($scope.save).to.be.ok.and.a('function');
	});

});
