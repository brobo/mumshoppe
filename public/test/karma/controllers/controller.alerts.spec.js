describe('The alert controller', function() {

	beforeEach(function() {
		module('controller.alerts');
		module('service.alert');
	});

	var AlertsController, AlertService, $scope;

	beforeEach(inject(function($injector) {
		$scope = $injector.get('$rootScope').$new();
		AlertService = sinon.stub($injector.get('AlertService'));
		AlertsController = $injector.get('$controller')('AlertsController', {
			$scope: $scope,
			AlertService: AlertService
		});
	}));

	it('should allow alerts to be closed', function() {
		expect($scope).to.have.property('closeAlert').that.is.a('function');
		$scope.closeAlert(5);
		expect(AlertService.close.calledOnce).to.be.true;
		expect(AlertService.close.firstCall.args).to.have.deep.property('[0]', 5);
	});

});
