describe('The group service', function() {

	beforeEach(module('service.group'));

	var $httpBackend;
	var GroupService;

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		GroupService = $injector.get('GroupService');
	}));

	beforeEach(function() {
		$httpBackend.whenGET('api/group').respond();
		$httpBackend.whenPOST('api/group/').respond();
		$httpBackend.whenPUT('api/group/1').respond();
		$httpBackend.whenDELETE('api/group/1').respond();
		$httpBackend.whenPOST('api/group/1/image').respond();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should request all groups', function() {
		var promise = GroupService.findAll();

		$httpBackend.expectGET('api/group');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should create a group', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = GroupService.create(payload);

		$httpBackend.expectPOST('api/group/', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});


	it('should update a group', function() {
		var payload = {
			name: 'Silver Bow'
		};

		var promise = GroupService.update(1, payload);

		$httpBackend.expectPUT('api/group/1', payload);
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

	it('should delete a group', function() {
		var promise = GroupService.delete(1);

		$httpBackend.expectDELETE('api/group/1');
		$httpBackend.flush();

		expect(promise).to.be.fulfilled;
	});

});
