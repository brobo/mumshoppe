describe('The ribbons controller', function() {

	beforeEach(function() {
		module('shop.controller.ribbons');
		module('ajoslin.promise-tracker');
		module('ui.bootstrap');
		module('service.alert');
		module('service.letter');
		module('service.ribbon');
	});

	var $controller;
	var RibbonsController, $scope, $modal, $q, promiseTracker,
		AlertService, LetterService, RibbonService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');

		$scope = $injector.get('$rootScope').$new();
		$modal = sinon.stub($injector.get('$modal'));
		$q = $injector.get('$q');
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		LetterService = sinon.stub($injector.get('LetterService'));
		RibbonService = sinon.stub($injector.get('RibbonService'));

		LetterService.findAll.returns($q.resolve([
			{ name: 'Simple', price: 0.25 },
			{ name: 'Bubble', price: 0.5 }
		]));
	}));

	function getController() {
		RibbonsController = $controller('RibbonsController', {
			$scope: $scope,
			$modal: $modal,
			$q: $q,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			LetterService: LetterService,
			RibbonService: RibbonService
		});
	}

	it('should fetch all letters', function() {
		getController();

		expect(LetterService.findAll.calledOnce).to.be.true;
	});

	it('should load the letters', function() {
		getController();
		$scope.$apply();

		expect($scope.letters).to.be.an('array').and.not.be.empty;
	});

	it('should display an error if letter loading fails', function() {
		LetterService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.letters).to.be.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

});

describe('The edit ribbon controller', function() {

	beforeEach(function() {
		module('shop.controller.ribbons');
		module('ajoslin.promise-tracker');
		module('service.alert');
	});

	var $q;
	var EditRibbonController, $scope, $modalInstance, promiseTracker, AlertService,
		callback, saveMums, letters, ribbon;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		callback = sinon.stub().returns($q.resolve());
		saveMum = sinon.spy();
		letters = [];
		ribbon = {
			content: 'Kumiko',
			letter: {
				id: 1,
				name: 'Simple',
				price: 0.25
			},
			mum: 1
		};

		EditRibbonController = $injector.get('$controller')('EditRibbonController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			saveMum: saveMum,
			letters: letters,
			ribbon: ribbon
		});
	}));

	it('should be cancelable', function() {
		expect($scope.cancel).to.be.ok.and.a('function');
		$scope.cancel();
		expect($modalInstance.dismiss.calledOnce).to.be.true;
	});

	it('should be savable', function() {
		expect($scope.save).to.be.ok.and.a('function');
	});

	it('should transform a copy on save', function() {
		$scope.save();
		expect(ribbon.letter).to.have.all.keys(['id', 'name', 'price']);
		expect(callback.called).to.be.true;
		expect(callback.firstCall.args).to.have.deep.property('[0].letter').that.is.a('number');
	});

	it('should display an error on save fail', function() {
		callback.returns($q.reject());
		$scope.save();
		$scope.$apply();

		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should save the mum on success', function() {
		$scope.save();
		$scope.$apply();
		expect(saveMum.called).to.be.true;
	});

	it('should close the modal on success', function() {
		$scope.save();
		$scope.$apply();
		expect($modalInstance.close.called).to.be.true;
	});

});
