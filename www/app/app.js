var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

var app = angular.module('customer_portal', ['ui.router', 'commonUtils','ui.bootstrap','datatables']);

// Register environment in AngularJS as constant
app.constant('__env', env);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'app/views/login/login.html',
		controller : 'LoginCtrl',
		cache : true
	})
	.state('createAccount', {
		url : '/createAccount',
		templateUrl : 'app/views/login/createAccount.html',
		controller : 'newAccountCtrl',
		cache : true
	})
	.state('home', {
		url : '/home',
		templateUrl : 'app/views/common/main.html',
		controller : 'mainCtrl',
		cache : true
	})
	.state('home.dashboard', {
		url : '/dashboard',
		templateUrl : 'app/views/dashboard/dashboard.html',
		controller : 'dashboardCtrl',
		cache : true
	});
});
