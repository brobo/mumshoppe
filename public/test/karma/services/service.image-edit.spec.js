describe('The image edit service', function() {

	beforeEach(function() {
		module('manage.service.image-edit');
		module('ui.bootstrap');
		module('manage.partials');
	});

	var ImageEditService, $modal, $templateCache;

	beforeEach(inject(function($injector) {
		$modal = $injector.get('$modal');
		sinon.stub($modal);

		ImageEditService = $injector.get('ImageEditService');
		$templateCache = $injector.get('$templateCache');
	}));

	it('should contain an open method', function() {
		expect(ImageEditService).to.have.property('open').that.is.a('function');
	});

	it('should open a modal', function() {
		ImageEditService.open('', sinon.stub());
		expect($modal.open.calledOnce).to.be.true;
	});

	it('should use the proper template and controller', function() {
		ImageEditService.open('', sinon.stub());
		var args = $modal.open.firstCall.args;

		expect(args).to.have.deep.property('[0].templateUrl', 'res/image-edit.html');
		expect(args).to.have.deep.property('[0].controller', 'imageEditController');
	});

	it('should use a template that exists', function() {
		ImageEditService.open('', sinon.stub());
		var arg = $modal.open.firstCall.args[0];

		expect($templateCache.get(arg.templateUrl)).to.be.ok;
	});

});
