describe('The bear service', function() {

	beforeEach(module('service.bear'));

	var $httpBackend;
	var BearService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		BearService = $injector.get('BearService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/bear').respond();
		$httpBackend.whenPOST('api/bear/').respond();
		$httpBackend.whenPUT('api/bear/1').respond();
		$httpBackend.whenDELETE('api/bear/1').respond();
		$httpBackend.whenPOST('api/bear/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all bears', function() {
		var promise = BearService.findAll();

		$httpBackend.expectGET('api/bear');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a bear', function() {
		var payload = {
			name: 'Band Bear'
		};

		var promise = BearService.create(payload);

		$httpBackend.expectPOST('api/bear/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a bear', function() {
		var payload = {
			name: 'Band Bear'
		};

		var promise = BearService.update(1, payload);

		$httpBackend.expectPUT('api/bear/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a bear', function() {
		var promise = BearService.delete(1);

		$httpBackend.expectDELETE('api/bear/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should get an image URL', function() {
		expect(BearService.imageUrl(1)).to.equal('api/bear/1/image');
		expect(BearService.imageUrl(7)).to.equals('api/bear/7/image');
	});

	it('should upload an image', function() {
		var image = {
			content: 'This is an image'
		};

		var promise = BearService.uploadImage(1, image);

		var fd = new FormData();
		fd.append('file', image);
		$httpBackend.expectPOST('api/bear/1/image', fd);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
