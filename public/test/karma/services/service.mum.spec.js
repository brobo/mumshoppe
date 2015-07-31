describe('The mum service', function() {

	beforeEach(module('service.mum'));

	var $httpBackend;
	var MumService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		MumService = $injector.get('MumService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/mum').respond();
		$httpBackend.whenPOST('api/mum/').respond();
		$httpBackend.whenPUT('api/mum/1').respond();
		$httpBackend.whenDELETE('api/mum/1').respond();
		$httpBackend.whenPOST('api/mum/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all mums', function() {
		var promise = MumService.findAll();

		$httpBackend.expectGET('api/mum');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a mum', function() {
		var payload = {
			name: 'Bubble'
		};

		var promise = MumService.create(payload);

		$httpBackend.expectPOST('api/mum/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a mum', function() {
		var payload = {
			id: 10
		};

		var promise = MumService.update(1, payload);

		$httpBackend.expectPUT('api/mum/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a mum', function() {
		var promise = MumService.delete(1);

		$httpBackend.expectDELETE('api/mum/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
