describe('The accentbow service', function() {

	beforeEach(module('service.accentbow'));

	var $httpBackend;
	var AccentBowService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		AccentBowService = $injector.get('AccentBowService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/accentbow').respond();
		$httpBackend.whenPOST('api/accentbow/').respond();
		$httpBackend.whenPUT('api/accentbow/1').respond();
		$httpBackend.whenDELETE('api/accentbow/1').respond();
		$httpBackend.whenPOST('api/accentbow/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all accent bows', function() {
		var promise = AccentBowService.findAll();

		$httpBackend.expectGET('api/accentbow');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create an accent bow', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = AccentBowService.create(payload);

		$httpBackend.expectPOST('api/accentbow/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update an accent bow', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = AccentBowService.update(1, payload);

		$httpBackend.expectPUT('api/accentbow/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete an accent bow', function() {
		var promise = AccentBowService.delete(1);

		$httpBackend.expectDELETE('api/accentbow/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should get an image URL', function() {
		expect(AccentBowService.imageUrl(1)).to.equal('api/accentbow/1/image');
		expect(AccentBowService.imageUrl(7)).to.equals('api/accentbow/7/image');
	});

	it('should upload an image', function() {
		var image = {
			content: 'This is an image'
		};

		var promise = AccentBowService.uploadImage(1, image);

		var fd = new FormData();
		fd.append('file', image);
		$httpBackend.expectPOST('api/accentbow/1/image', fd);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
