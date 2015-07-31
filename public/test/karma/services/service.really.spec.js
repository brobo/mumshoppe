describe('The really service', function() {

	beforeEach(function() {
		module('service.really');
		module('ui.bootstrap');
		module('shared.partials');
	});

	var ReallyService, $modal, $templateCache;

	beforeEach(inject(function($injector) {
		$modal = $injector.get('$modal');
		sinon.stub($modal);

		$templateCache = $injector.get('$templateCache');
		ReallyService = $injector.get('ReallyService');
	}));

	it('sholud contain the prompt method', function() {
		expect(ReallyService).to.have.property('prompt').that.is.a('function');
	});

	it('should open a modal', function() {
		ReallyService.prompt({}, sinon.stub());
		expect($modal.open.calledOnce).to.be.true;
	});

	it('should use the proper template and controller', function() {
		ReallyService.prompt({}, sinon.stub());
		var args = $modal.open.firstCall.args;

		expect(args).to.have.deep.property('[0].templateUrl', 'really.html');
		expect(args).to.have.deep.property('[0].controller', 'ReallyController');
	});

	it('should use a template that exists', function() {
		ReallyService.prompt({}, sinon.stub());
		var arg = $modal.open.firstCall.args[0];

		expect($templateCache.get(arg.templateUrl)).to.be.ok;
	});

	it('should use defaults that are not provided', function() {
		ReallyService.prompt({
			head: 'Test head'
		}, sinon.stub());
		var dataFunction = $modal.open.firstCall.args[0].resolve.data;

		expect(dataFunction).to.be.a('function');

		var data = dataFunction();

		expect(data).to.be.ok.and.have.all.keys(['head', 'body', 'yes', 'no']);
		expect(data).to.have.property('head', 'Test head');
		expect(data).to.have.property('body').that.is.ok;
		expect(data).to.have.property('yes').that.is.ok;
		expect(data).to.have.property('no').that.is.ok;
	});

});
