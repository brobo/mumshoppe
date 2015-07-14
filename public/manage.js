var app = angular.module('mumshoppe-manage', [
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
	'controller.alerts',
	'controller.really',
	'manage.partials',
	'manage.controller.groups',
	'manage.controller.products',
	'manage.controller.backings',
	'manage.controller.accentbows',
	'manage.controller.letters',
	'manage.controller.bears',
	'manage.controller.accessories',
	'service.really',
	'service.group',
	'service.product',
	'service.backing',
	'service.accentbow',
	'service.letter',
	'service.bear',
	'service.accessory',
	'service.category',
	'service.alert']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	// $urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('index', {
			url: '',
			templateUrl: 'index.html'
		})
		.state('base', {
			templateUrl: 'base.html'
		})
		.state('base.options', {
			url: '/options',
			templateUrl: 'options.html'
		})
		.state('base.options.groups', {
			templateUrl: 'options/groups.html',
			controller: 'groupsController'
		})
		.state('base.options.products', {
			templateUrl: 'options/products.html',
			controller: 'productsController'
		})
		.state('base.options.backings', {
			templateUrl: 'options/backings.html',
			controller: 'backingsController'
		})
		.state('base.options.accentbows', {
			templateUrl: 'options/accentbows.html',
			controller: 'accentbowsController'
		})
		.state('base.options.letters', {
			templateUrl: 'options/letters.html',
			controller: 'lettersController'
		})
		.state('base.options.bears', {
			templateUrl: 'options/bears.html',
			controller: 'bearsController'
		})
		.state('base.options.accessories', {
			templateUrl: 'options/accessories.html',
			controller: 'accessoriesController'
		});

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

});
