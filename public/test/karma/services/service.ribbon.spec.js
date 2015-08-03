describe('The ribbon service', function() {

	beforeEach(module('service.ribbon'));

	var $httpBackend;
	var RibbonService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		RibbonService = $injector.get('RibbonService');
	}));

	beforeEach(function() {
		$httpBackend.whenPOST('api/ribbon/').respond();
		$httpBackend.whenPUT('api/ribbon/1').respond();
		$httpBackend.whenDELETE('api/ribbon/1').respond();
		$httpBackend.whenPOST('api/ribbon/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should create a ribbon', function() {
		var payload = {
			content: 'Kumiko Okada'
		};

		var promise = RibbonService.create(payload);

		$httpBackend.expectPOST('api/ribbon/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a ribbon', function() {
		var payload = {
			content: 'Kumiko Okada'
		};

		var promise = RibbonService.update(1, payload);

		$httpBackend.expectPUT('api/ribbon/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a ribbon', function() {
		var promise = RibbonService.delete(1);

		$httpBackend.expectDELETE('api/ribbon/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
