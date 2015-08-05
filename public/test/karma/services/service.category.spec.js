describe('The category service', function() {

	beforeEach(module('service.category'));

	var $httpBackend;
	var CategoryService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		CategoryService = $injector.get('CategoryService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/category').respond();
		$httpBackend.whenPOST('api/category/').respond();
		$httpBackend.whenPUT('api/category/1').respond();
		$httpBackend.whenDELETE('api/category/1').respond();
		$httpBackend.whenPOST('api/category/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all categories', function() {
		var promise = CategoryService.findAll();

		$httpBackend.expectGET('api/category');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a category', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = CategoryService.create(payload);

		$httpBackend.expectPOST('api/category/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a category', function() {
		var payload = {
			name: 'Musical'
		};

		var promise = CategoryService.update(1, payload);

		$httpBackend.expectPUT('api/category/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a category', function() {
		var promise = CategoryService.delete(1);

		$httpBackend.expectDELETE('api/category/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
