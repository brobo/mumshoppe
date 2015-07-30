var app = angular.module('mumshoppe-shop', [
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
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
		});

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

});

