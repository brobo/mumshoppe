describe('The image edit controller', function() {

	beforeEach(function() {
		module('manage.controller.image-edit');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var ImageEditController, $scope, $modalInstance, AlertService,
		promiseTracker, imageUrl, uploadAction;

	beforeEach(inject(function($injector) {

		$scope = $injector.get('$rootScope').$new();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		AlertService = sinon.stub($injector.get('AlertService'));
		promiseTracker = $injector.get('promiseTracker');

		imageUrl = 'path/to/image.png';
		uploadAction = sinon.spy();

		ImageEditController = $injector.get('$controller')('ImageEditController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			AlertService: AlertService,
			promiseTracker: promiseTracker,
			imageUrl: imageUrl,
			uploadAction: uploadAction
		});

	}));

	it('should allow to be canceled', function() {
		expect($scope).to.have.property('cancel').that.is.a('function');
		$scope.cancel();
		expect($modalInstance.dismiss.called).to.be.true;
	});

	it('should allow to be saved', function() {
		expect($scope).to.have.property('save').that.is.a('function');
	});

});
