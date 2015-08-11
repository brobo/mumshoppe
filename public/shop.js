var app = angular.module('mumshoppe-shop', [
	'angular-jwt',
	'ui.router',
	'ui.bootstrap',
	'ajoslin.promise-tracker',
	'ngCookies',
	'ngMessages',
	'shared.partials',
	'shop.partials',
	'controller.alerts',
	'controller.really',
	'shop.controller.login',
	'shop.controller.home',
	'shop.controller.customize',
	'shop.controller.backings',
	'shop.controller.accent-bows',
	'shop.controller.ribbons',
	'shop.controller.accessories',
	'shop.controller.bears',
	'shop.controller.review',
	'shop.controller.pay',
	'service.alert',
	'service.customer',
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
	'service.product',
	'service.order'
]);

app.config([
'$stateProvider',
'$urlRouterProvider',
'$httpProvider',
function($stateProvider, $urlRouterProvider, $httpProvider) {

	$stateProvider
		.state('index', {
			url: ''
		})
		.state('login', {
			url: '/login',
			templateUrl: 'login.html',
			controller: 'LoginController'
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
			url: '/customize/:order_id',
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
		})
		.state('base.customize.review', {
			url: '/review',
			parent: 'base.customize',
			templateUrl: 'customize/review.html',
			controller: 'ReviewController'
		})
		.state('base.pay', {
			url: '/pay/:orderId',
			templateUrl: 'pay.html',
			controller: 'PayController'
		})

		$httpProvider.defaults.post = {'Content-Type': 'application/x-www-form-urlencoded'};
		$httpProvider.defaults.put = {'Content-Type': 'application/x-www-form-urlencoded'};

}]);
