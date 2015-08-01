describe('The letters controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('manage.controller.letters');
		module('service.alert');
		module('service.really');
		module('service.letter');
	});

	var $controller, $q, LettersController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, LetterService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		AlertService = sinon.stub($injector.get('AlertService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		LetterService = sinon.stub($injector.get('LetterService'));

		LetterService.findAll.returns($q.resolve([
			'letter A',
			'letter B',
			'letter C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			LettersController = $injector.get('$controller')('LettersController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				LetterService: LetterService
			});
		});
	}

	it('should find all letters', function() {
		getController();

		expect(LetterService.findAll.calledOnce).to.be.true;
	});

	it('should define the letters', function() {
		getController();
		$scope.$apply();

		expect($scope.letters).to.be.ok.and.an('array').with.length(3);
	});

	it('should add an alert if an error occurs while fetching letters', function() {
		LetterService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.letters).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should allow letters to be added', function() {
		getController();
		expect($scope.addLetter).to.be.ok.and.a('function');
	});

	it('should allow letters to be edited', function() {
		getController();
		expect($scope.editLetter).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteLetter({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteLetter({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteLetter({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false;
	});

});

describe('The letter edit controller', function() {

	beforeEach(function() {
		module('manage.controller.letters');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, letter, EditLetterController;

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
		letter = {};

		EditLetterController = $injector.get('$controller')('letters.EditLetterController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			letter: letter
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
