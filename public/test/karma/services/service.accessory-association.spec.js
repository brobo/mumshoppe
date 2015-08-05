describe('The accessory association service', function() {

	beforeEach(module('service.accessory-association'));

	var $httpBackend;
	var CategoryService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		CategoryService = $injector.get('AccessoryAssociationService');
	}));

	beforeEach(function() {
		$httpBackend.whenPOST('api/association/').respond();
		$httpBackend.whenPUT('api/association/1').respond();
		$httpBackend.whenDELETE('api/association/1').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should create an association', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = CategoryService.create(payload);

		$httpBackend.expectPOST('api/association/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update an association', function() {
		var payload = {
			id: 2	
		};

		var promise = CategoryService.update(1, payload);

		$httpBackend.expectPUT('api/association/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete an association', function() {
		var promise = CategoryService.delete(1);

		$httpBackend.expectDELETE('api/association/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
