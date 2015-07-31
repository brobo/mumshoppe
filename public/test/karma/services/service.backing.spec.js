describe('The backing service', function() {

	beforeEach(module('service.backing'));

	var $httpBackend;
	var BackingService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		BackingService = $injector.get('BackingService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/backing').respond();
		$httpBackend.whenPOST('api/backing/').respond();
		$httpBackend.whenPUT('api/backing/1').respond();
		$httpBackend.whenDELETE('api/backing/1').respond();
		$httpBackend.whenPOST('api/backing/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all backings', function() {
		var promise = BackingService.findAll();

		$httpBackend.expectGET('api/backing');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a backing', function() {
		var payload = {
			name: 'Blue Points'
		};

		var promise = BackingService.create(payload);

		$httpBackend.expectPOST('api/backing/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a backing', function() {
		var payload = {
			name: 'Blue Points'
		};

		var promise = BackingService.update(1, payload);

		$httpBackend.expectPUT('api/backing/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a backing', function() {
		var promise = BackingService.delete(1);

		$httpBackend.expectDELETE('api/backing/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should get an image URL', function() {
		expect(BackingService.imageUrl(1)).to.equal('api/backing/1/image');
		expect(BackingService.imageUrl(7)).to.equals('api/backing/7/image');
	});

	it('should upload an image', function() {
		var image = {
			content: 'This is an image'
		};

		var promise = BackingService.uploadImage(1, image);

		var fd = new FormData();
		fd.append('file', image);
		$httpBackend.expectPOST('api/backing/1/image', fd);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
