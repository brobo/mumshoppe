describe('The customize backings controller', function() {

	beforeEach(function() {
		module('shop.controller.backings');
		module('service.alert');
		module('service.backing');
		module('ajoslin.promise-tracker');
	});

	var $controller, $q;
	var BackingsController, $scope, promiseTracker, AlertService, BackingService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$scope.mumPromise = $q.resolve();
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		BackingService = sinon.stub($injector.get('BackingService'));

		BackingService.findAll.returns($q.resolve([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 }
		]));
	}));

	function getController() {
		BackingsController = $controller('BackingsController', {
			$scope: $scope,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			BackingService: BackingService
		});
	}

	it('should fetch all backings', function() {
		getController();
		$scope.$apply();
		expect(BackingService.findAll.calledOnce).to.be.true;
	});

	it('should wait for the mum promise to be resolved', function() {
		var deferred = $q.defer();
		$scope.mumPromise = deferred.promise;
		getController();
		$scope.$apply();

		expect(BackingService.findAll.called).to.be.false;

		deferred.resolve();
		$scope.$apply();
		expect(BackingService.findAll.called).to.be.true;
	});

	it('should assign trackers and imageUrls to backings', function() {
		getController();
		$scope.$apply();

		expect($scope.backings).to.be.ok.and.an('array').that.is.not.empty;
		for (var i = 0; i < $scope.backings.length; i++) {
			expect($scope.backings[i]).to.contain.all.keys(['tracker', 'imageUrl']);
		}
	});

	it('should allow backings to be selected', function() {
		getController();

		expect($scope.select).to.be.ok.and.a('function');
	});
});
