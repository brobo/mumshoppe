describe('The customize accent bows controller', function() {

	beforeEach(function() {
		module('shop.controller.accent-bows');
		module('service.alert');
		module('service.accent-bow');
		module('ajoslin.promise-tracker');
	});

	var $controller, $q;
	var BackingsController, $scope, promiseTracker, AlertService, AccentBowService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$scope.mumPromise = $q.resolve();
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		AccentBowService = sinon.stub($injector.get('AccentBowService'));

		AccentBowService.findAll.returns($q.resolve([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 }
		]));
	}));

	function getController() {
		AccentBowsController = $controller('AccentBowsController', {
			$scope: $scope,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			AccentBowService: AccentBowService
		});
	}

	it('should fetch all bows', function() {
		getController();
		$scope.$apply();
		expect(AccentBowService.findAll.calledOnce).to.be.true;
	});

	it('should wait for the mum promise to be resolved', function() {
		var deferred = $q.defer();
		$scope.mumPromise = deferred.promise;
		getController();
		$scope.$apply();

		expect(AccentBowService.findAll.called).to.be.false;

		deferred.resolve();
		$scope.$apply();
		expect(AccentBowService.findAll.called).to.be.true;
	});

	it('should assign trackers and imageUrls to accent bows', function() {
		getController();
		$scope.$apply();

		expect($scope.bows).to.be.ok.and.an('array').that.is.not.empty;
		for (var i = 0; i < $scope.bows.length; i++) {
			expect($scope.bows[i]).to.contain.all.keys(['tracker', 'imageUrl']);
		}
	});

	it('should allow bows to be selected', function() {
		getController();

		expect($scope.select).to.be.ok.and.a('function');
	});
});
