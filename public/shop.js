var app = angular.module('mumshoppe-shop', [
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
	'shared.partials',
	'shop.partials',
	'controller.alerts',
	'controller.really',
	'shop.controller.home',
	'shop.controller.customize',
	'shop.controller.backings',
	'shop.controller.accent-bows',
	'shop.controller.ribbons',
	'shop.controller.accessories',
	'shop.controller.bears',
	'service.alert',
	'service.accent-bow',
	'service.backing',
	'service.really',
	'service.group',
	'service.letter',
	'service.ribbon',
	'service.bear',
	'service.accessory',
	'service.category',
	'service.accessory-association',
	'service.mum',
	'service.product'
]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$stateProvider
		.state('index', {
			url: ''
		})
		.state('base', {
			templateUrl: 'base.html'
		})
		.state('base.home', {
			url: '/home',
			templateUrl: 'home.html',
			controller: 'HomeController'
		})
		.state('base.customize', {
			url: '/customize/:mum_id',
			templateUrl: 'customize.html',
			controller: 'CustomizeController'
		})
		.state('base.customize.backings', {
			url: '/backings',
			parent: 'base.customize',
			templateUrl: 'customize/backings.html',
			controller: 'BackingsController'
		})
		.state('base.customize.accentbows', {
			url: '/accentbows',
			parent: 'base.customize',
			templateUrl: 'customize/accent-bows.html',
			controller: 'AccentBowsController'
		})
		.state('base.customize.ribbons', {
			url: '/ribbons',
			parent: 'base.customize',
			templateUrl: 'customize/ribbons.html',
			controller: 'RibbonsController'
		})
		.state('base.customize.bears', {
			url: '/bears',
			parent: 'base.customize',
			templateUrl: 'customize/bears.html',
			controller: 'BearsController'
		})
		.state('base.customize.accessories', {
			url: '/accessories',
			parent: 'base.customize',
			templateUrl: 'customize/accessories.html',
			controller: 'AccessoriesController'
		});

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

});

