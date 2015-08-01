describe('The accessory controller', function() {

	beforeEach(function() {
		module('ui.bootstrap');
		module('ajoslin.promise-tracker');
		module('manage.controller.accessories');
		module('service.alert');
		module('manage.service.image-edit');
		module('service.really');
		module('service.group');
		module('service.category');
		module('service.accessory');
	});

	var $controller, $q, promiseTracker, AccessoriesController, $scope, $modal, AlertService,
		ImageEditService, ReallyService, GroupService, CategoryService, AccessoryService;

	beforeEach(inject(function($injector) {
		$controller = $injector.get('$controller');
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modal = $injector.get('$modal');
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		ImageEditService = sinon.stub($injector.get('ImageEditService'));
		ReallyService = sinon.stub($injector.get('ReallyService'));
		GroupService = sinon.stub($injector.get('GroupService'));
		CategoryService = sinon.stub($injector.get('CategoryService'));
		AccessoryService = sinon.stub($injector.get('AccessoryService'));

		CategoryService.findAll.returns($q.resolve([
			{ name: 'category A', category: { id: 1 } },
			{ name: 'category B', category: { id: 2 } },
			{ name: 'category C', category: { id: 3 } }
		]));
		GroupService.findAll.returns($q.resolve([
			'group A',
			'group B',
			'group C'
		]));
		AccessoryService.findAll.returns($q.resolve([
			'accessory A',
			'accessory B',
			'accessory C'
		]));
	}));

	function getController() {
		inject(function($injector) {
			AccessoriesController = $injector.get('$controller')('AccessoriesController', {
				$scope: $scope,
				$modal: $modal,
				$q: $q,
				promiseTracker: promiseTracker,
				AlertService: AlertService,
				ImageEditService: ImageEditService,
				ReallyService: ReallyService,
				CategoryService: CategoryService,
				GroupService: GroupService,
				AccessoryService: AccessoryService
			});
		});
	}

	it('should find all categories, groups and accessories', function() {
		getController();

		expect(CategoryService.findAll.calledOnce).to.be.true;
		expect(GroupService.findAll.calledOnce).to.be.true;
		expect(AccessoryService.findAll.calledOnce).to.be.true;
	});

	it('should define the categories, groups and accessories', function() {
		getController();
		$scope.$apply();

		expect($scope.categories).to.be.ok.and.an('array').with.length(3);
		expect($scope.groups).to.be.ok.and.an('array').with.length(3);
		expect($scope.accessories).to.be.ok.and.an('array').with.length(3);
	});

	it('should add a tracker to all categories', function() {
		getController();
		$scope.$apply();

		expect($scope.categories).to.be.ok.and.an('array').that.is.not.empty;
		for (var i = 0; i < $scope.categories.length; i++) {
			expect($scope.categories[i]).to.have.property('tracker');
		}
	});

	it('should add an alert if an error occurs while fetching categories', function() {
		CategoryService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.categories).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should add an alert if an error occurs while fetching groups', function() {
		GroupService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.groups).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should add an alert if an error occurs while fetching accessories', function() {
		AccessoryService.findAll.returns($q.reject());
		getController();
		$scope.$apply();

		expect($scope.accessories).to.be.ok.and.an('array').with.length(0);
		expect(AlertService.add.calledOnce).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
	});

	it('should determine which groups an accessory belongs to', function() {
		getController();
		var accessory = {
			groups: [
				{ id: 1 },
				{ id: 2 },
				{ id: 5 }
			]
		};

		expect($scope.hasGroup).to.be.ok.and.a('function');
		expect($scope.hasGroup(accessory, { id: 1 })).to.be.true;
		expect($scope.hasGroup(accessory, { id: 2 })).to.be.true;
		expect($scope.hasGroup(accessory, { id: 3 })).to.be.false;
		expect($scope.hasGroup(accessory, { id: 4 })).to.be.false;
		expect($scope.hasGroup(accessory, { id: 5 })).to.be.true;
		expect($scope.hasGroup(accessory, { id: 6 })).to.be.false;
	});

	it('should filter accessories by category', function() {
		getController();
		var accessories = [
			{ id: 1, category: { id: 1 } },
			{ id: 2, category: { id: 2 } },
			{ id: 3, category: { id: 2 } },
			{ id: 4, category: { id: 3 } }
		];

		$scope.selectedCategory = 2;
		expect($scope.filterAccessories).to.be.ok.and.a('function');
		expect($scope.filterAccessories(accessories[0])).to.be.false;		
		expect($scope.filterAccessories(accessories[1])).to.be.true;
		expect($scope.filterAccessories(accessories[2])).to.be.true;
		expect($scope.filterAccessories(accessories[3])).to.be.false;
	});

	it('should allow the image to be edited', function() {
		getController();

		expect($scope.openImageModal).to.be.ok.and.a('function');
		$scope.openImageModal({ id: 1 });
		expect(ImageEditService.open.calledOnce).to.be.true;
	});

	it('should allow accessories to be added', function() {
		getController();
		expect($scope.addAccessory).to.be.ok.and.a('function');
	});

	it('should allow accessories to be edited', function() {
		getController();
		expect($scope.editAccessory).to.be.ok.and.a('function');
	});

	it('should allow categories to be edited', function() {
		getController();
		expect($scope.editCategories).to.be.ok.and.a('function');
	});

	it('should prompt the user before deleting', function() {
		ReallyService.prompt.returns({ result: $q.defer().promise });
		getController();

		$scope.deleteAccessory({ id: 1 });
		$scope.$apply();
		expect(ReallyService.prompt.calledOnce).to.be.true;
		expect(AlertService.add.called).to.be.false;
	});

	it('should display a success message on delete', function() {
		getController();

		ReallyService.prompt.onFirstCall().returns({ result: $q.resolve() });
		$scope.deleteAccessory({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');

		AlertService.add.reset();

		ReallyService.prompt.onSecondCall().returns({ result: $q.reject() });
		$scope.deleteAccessory({ id: 1 });
		$scope.$apply();
		expect(AlertService.add.called).to.be.false
	});

});

describe('The accessory edit controller', function() {

	beforeEach(function() {
		module('manage.controller.accessories');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService,
		callback, groups, categories, accessory, EditAccessoryController;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		callback = sinon.stub().returns($q.defer().promise);
		groups = [];
		categories = [];
		accessory = {};

		EditAccessoryController = $injector.get('$controller')('accessories.EditAccessoryController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			callback: callback,
			groups: groups,
			categories: categories,
			accessory: accessory
		});
	}));

	it('should have cancel and save methods', function() {
		expect($scope.cancel).to.be.ok.and.a('function');
		expect($scope.save).to.be.ok.and.a('function');
	});

	it('should cancel the request', function() {
		$scope.cancel();

		expect($modalInstance.dismiss.called).to.be.true;
	});

	it('should display a success or error message, as appropriate', function() {
		callback.onFirstCall().returns($q.resolve());
		$scope.save();
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'success');
		expect($modalInstance.close.called).to.be.true;

		AlertService.add.reset();

		callback.onSecondCall().returns($q.reject());
		$scope.save();
		$scope.$apply();
		expect(AlertService.add.called).to.be.true;
		expect(AlertService.add.firstCall.args).to.have.deep.property('[0]', 'danger');
		expect($modalInstance.close.called).to.be.true;
	});

});

describe('The category edit controller', function() {

	beforeEach(function() {
		module('manage.controller.accessories');
		module('service.category');
		module('service.alert');
		module('ajoslin.promise-tracker');
	});

	var $q, $scope, $modalInstance, promiseTracker, AlertService, CategoryService,
		parentScope, CategoriesController;

	beforeEach(inject(function($injector) {
		$q = $injector.get('$q');

		$scope = $injector.get('$rootScope').$new();
		parentScope = $injector.get('$rootScope').$new();
		parentScope.updateCategories = sinon.spy();
		$modalInstance = {
			close: sinon.spy(),
			dismiss: sinon.spy()
		};
		promiseTracker = $injector.get('promiseTracker');
		AlertService = sinon.stub($injector.get('AlertService'));
		callback = sinon.stub().returns($q.defer().promise);

		CategoryService = sinon.stub($injector.get('CategoryService'));

		CategoriesController = $injector.get('$controller')('accessories.CategoriesController', {
			$scope: $scope,
			$modalInstance: $modalInstance,
			promiseTracker: promiseTracker,
			AlertService: AlertService,
			CategoryService: CategoryService,
			parentScope: parentScope
		});
	}));

	it('should have add and delete methods', function() {
		expect($scope.addCategory).to.be.ok.and.a('function');
		expect($scope.deleteCategory).to.be.ok.and.a('function');
	});

	it('should try to update the categories', function() {
		expect(parentScope.updateCategories.called).to.be.true;
	});

	it('should close the modal', function() {
		$scope.close();

		expect($modalInstance.close.called).to.be.true;
	});

});
