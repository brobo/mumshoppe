var app = angular.module('mumshoppe-shop', [
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
	'shared.partials',
	'shop.partials',
	'controller.alerts',
	'controller.really',
	'shop.controller.home',
	'service.alert',
	'service.backing',
	'service.really',
	'service.group',
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
			url: '/customize',
			templateUrl: 'customize.html'
		})
		.state('base.customize.backings', {
			url: '/backings',
			parent: 'base.customize',
			template: 'Backings'
		})
		.state('base.customize.accentbows', {
			url: '/accentbows',
			parent: 'base.customize',
			template: 'Accent Bows'
		})
		.state('base.customize.ribbons', {
			url: '/ribbons',
			parent: 'base.customize',
			template: 'Name Ribbons'
		})
		.state('base.customize.bears', {
			url: '/bears',
			parent: 'base.customize',
			template: 'Bears'
		})
		.state('base.customize.accessories', {
			url: '/accessories',
			parent: 'base.customize',
			template: 'Accessories'
		});

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

});

