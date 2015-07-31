describe('The letter service', function() {

	beforeEach(module('service.letter'));

	var $httpBackend;
	var LetterService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		LetterService = $injector.get('LetterService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/letter').respond();
		$httpBackend.whenPOST('api/letter/').respond();
		$httpBackend.whenPUT('api/letter/1').respond();
		$httpBackend.whenDELETE('api/letter/1').respond();
		$httpBackend.whenPOST('api/letter/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all letters', function() {
		var promise = LetterService.findAll();

		$httpBackend.expectGET('api/letter');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a letter', function() {
		var payload = {
			name: 'Bubble'
		};

		var promise = LetterService.create(payload);

		$httpBackend.expectPOST('api/letter/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a letter', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = LetterService.update(1, payload);

		$httpBackend.expectPUT('api/letter/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a letter', function() {
		var promise = LetterService.delete(1);

		$httpBackend.expectDELETE('api/letter/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
