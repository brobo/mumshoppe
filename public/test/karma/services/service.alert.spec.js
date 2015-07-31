describe('The alert service', function() {

	beforeEach(module('service.alert'));

	var AlertService, $rootScope;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');

		AlertService = $injector.get('AlertService');
	}));

	it('should be a service', function() {
		expect(AlertService).to.have.all.keys(['add', 'close', 'clear']);
	});

	it('should define the alerts array', function() {
		expect($rootScope.alerts).to.be.ok;
		expect($rootScope.alerts).to.be.an('array').that.is.empty;
	});

	it('should add alerts to the array', function() {
		AlertService.add('success', 'Everything is OK');
		AlertService.add('danger', 'Something went wrong');

		expect($rootScope.alerts).to.have.length(2);
		expect($rootScope.alerts).to.have.deep.property('[0].type').that.equals('danger');
		expect($rootScope.alerts).to.have.deep.property('[1].message').that.equals('Everything is OK');
	});

	it('should return an alert when added', function() {
		var alert = AlertService.add('', '');

		expect(alert).to.be.ok.and.contain.all.keys(['type', 'message']);
	});

	it('should close alerts', function() {
		AlertService.add('success');
		var target = AlertService.add('danger');
		AlertService.add('success');

		AlertService.close(target);

		expect($rootScope.alerts).to.have.length(2).and.not.include(target);
		expect($rootScope.alerts).to.have.deep.property('[0].type', 'success');
		expect($rootScope.alerts).to.have.deep.property('[1].type', 'success');
	});

	it('should create alerts that can close themselves', function() {
		AlertService.add('success');
		var target = AlertService.add('danger');
		AlertService.add('success');

		expect(target).to.include.property('close').that.is.a('function');

		target.close();

		expect($rootScope.alerts).to.have.length(2).and.not.include(target);
	});

	it('should clear alerts', function() {
		AlertService.add();
		AlertService.add();

		AlertService.clear();
		
		expect($rootScope.alerts).to.be.ok.and.empty;
	});

});
