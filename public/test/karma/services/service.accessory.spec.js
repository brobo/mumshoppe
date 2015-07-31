describe('The accessory service', function() {

	beforeEach(module('service.accessory'));

	var $httpBackend;
	var AccessoryService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		AccessoryService = $injector.get('AccessoryService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/accessory').respond();
		$httpBackend.whenPOST('api/accessory/').respond();
		$httpBackend.whenPUT('api/accessory/1').respond();
		$httpBackend.whenDELETE('api/accessory/1').respond();
		$httpBackend.whenPOST('api/accessory/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all accessories', function() {
		var promise = AccessoryService.findAll();

		$httpBackend.expectGET('api/accessory');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create an accessory', function() {
		var payload = {
			name: 'Trinket'
		};

		var promise = AccessoryService.create(payload);

		$httpBackend.expectPOST('api/accessory/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update an accessory', function() {
		var payload = {
			name: 'Trinket'
		};

		var promise = AccessoryService.update(1, payload);

		$httpBackend.expectPUT('api/accessory/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete an accessory', function() {
		var promise = AccessoryService.delete(1);

		$httpBackend.expectDELETE('api/accessory/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should get an image URL', function() {
		expect(AccessoryService.imageUrl(1)).to.equal('api/accessory/1/image');
		expect(AccessoryService.imageUrl(7)).to.equals('api/accessory/7/image');
	});

	it('should upload an image', function() {
		var image = {
			content: 'This is an image'
		};

		var promise = AccessoryService.uploadImage(1, image);

		var fd = new FormData();
		fd.append('file', image);
		$httpBackend.expectPOST('api/accessory/1/image', fd);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
