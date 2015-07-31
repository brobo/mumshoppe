describe('The product service', function() {

	beforeEach(module('service.product'));

	var $httpBackend;
	var ProductService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		ProductService = $injector.get('ProductService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/product').respond();
		$httpBackend.whenPOST('api/product/').respond();
		$httpBackend.whenPUT('api/product/1').respond();
		$httpBackend.whenDELETE('api/product/1').respond();
		$httpBackend.whenPOST('api/product/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all products', function() {
		var promise = ProductService.findAll();

		$httpBackend.expectGET('api/product');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a product', function() {
		var payload = {
			name: 'Bubble'
		};

		var promise = ProductService.create(payload);

		$httpBackend.expectPOST('api/product/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a product', function() {
		var payload = {
			name: 'Double Mum'
		};

		var promise = ProductService.update(1, payload);

		$httpBackend.expectPUT('api/product/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a product', function() {
		var promise = ProductService.delete(1);

		$httpBackend.expectDELETE('api/product/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
