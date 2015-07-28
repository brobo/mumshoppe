var app = angular.module('mumshoppe-shop', [
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
	'shop.partials',
	'controller.alerts',
	'controller.really',
	'service.alert',
	'service.really'
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
			controller: 'homeController'
		});

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

});

