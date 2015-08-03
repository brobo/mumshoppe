describe('The bears controller', function() {

	beforeEach(function() {
		module('shop.controller.bears');
		module('ajoslin.promise-tracker');
		module('service.alert');
		module('service.bear');
	});

	var $q, mumDeferred;
	var BearsController, $scope, promiseTracker, AlertService, BearService;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');
		$scope = $injector.get('$rootScope').$new();
		mumDeferred = $q.defer();
		$scope.mumPromise = mumDeferred.promise;
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		BearService = sinon.stub($injector.get('BearService'));
		BearService.findAll.returns($q.resolve([
			{
				id: 1,
				groups: [
					{ id : 1 },
					{ id : 2 },
					{ id : 3 }
				]
			}, {
				id: 2,
				groups: [
					{ id: 1 },
					{ id: 3 },
					{ id: 4 }
				]
			}
		]));

		BearsController = $injector.get('$controller')('BearsController', {
			$scope: $scope,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			BearService: BearService
		});
	}));

	it('should find all bears', function() {
		mumDeferred.resolve();
		$scope.$apply();

		expect(BearService.findAll.calledOnce).to.be.true;
	});

	it('should add a tracker and imageUrl to all bears', function() {
		mumDeferred.resolve();
		$scope.$apply();
		expect($scope.bears).to.be.ok.and.an('array').and.not.be.empty;
		for (var i = 0; i < $scope.bears.length; i++) {
			expect($scope.bears[i]).to.include.all.keys(['tracker', 'imageUrl']);
		}
	});

	it('should match bears and groups', function() {
		mumDeferred.resolve();
		$scope.$apply();
		expect($scope.hasGroup({ id: 1 })($scope.bears[0])).to.be.true;
		expect($scope.hasGroup({ id: 2 })($scope.bears[1])).to.be.false;
	});

	it('should match bears and mums', function() {
		mumDeferred.resolve();
		$scope.$apply();
		$scope.mum = {
			bears: [
				{ id: 1 },
				{ id: 3 }
			]
		};

		expect($scope.hasBear($scope.bears[0])).to.be.true;
		expect($scope.hasBear($scope.bears[1])).to.be.false;
	});

	it('should add and remove bears', function() {
		expect($scope.addBear).to.be.ok.and.a('function');
		expect($scope.removeBear).to.be.ok.and.a('function');
	});

});
