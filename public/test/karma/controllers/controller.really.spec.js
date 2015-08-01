describe('The really controller', function() {

	beforeEach(function() {
		module('controller.really');
		module('ajoslin.promise-tracker');
	});

	var ReallyController, $scope, $modalInstance,
		promiseTracker, data, callback;

	var $q;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');
		$scope = $injector.get('$rootScope').$new();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		promiseTracker = $injector.get('promiseTracker');
		data = {};
		callback = sinon.stub();

		ReallyController = $injector.get('$controller')('ReallyController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			data: data,
			callback: callback
		});
	}));

	it('should allow to be canceled', function() {
		expect($scope).to.have.property('cancel').that.is.a('function');
		$scope.cancel();
		expect($modalInstance.dismiss.calledOnce).to.be.true;
	});

	it('should allow to be confirmed', function() {
		expect($scope).to.have.property('confirm').that.is.a('function');
	});

	it('should close the modal on success', function() {
		callback.returns($q.resolve());
		$scope.confirm();
		$scope.$apply();
		expect($modalInstance.close.calledOnce).to.be.true;
	});

	it('should dismiss the modal on failure', function() {
		callback.returns($q.reject());
		$scope.confirm();
		$scope.$apply();
		expect($modalInstance.dismiss.calledOnce).to.be.true;
	});

	it('should close the modal if callback isn\'t a promise', function() {
		callback.returns({});
		$scope.confirm();
		$scope.$apply();
		expect($modalInstance.close.calledOnce).to.be.true;
	});

});
