var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

var app = angular.module('demo', ['ui.router', 'commonUtils', 'pascalprecht.translate','ui.bootstrap','datatables'])

// Register environment in AngularJS as constant
app.constant('__env', env);

app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
	/**Translate Provider for localization i18n**/
	$translateProvider.useStaticFilesLoader({
		prefix : 'resources/locales/',
		suffix : '.json'
	}).registerAvailableLanguageKeys(['en'], {
		//Add value for other locales if needed.  'en' : 'en'
	}).preferredLanguage('en').fallbackLanguage('en').determinePreferredLanguage().useSanitizeValueStrategy('escapeParameters');



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
	})
	.state('home.customer', {
		url : '/customer',
		templateUrl : 'app/views/customer/newCustomer.html',
		controller : 'customerCtrl',
		cache : true
	})
	.state('home.profile', {
		url : '/profile',
		templateUrl : 'app/views/profile/customerProfile.html',
		controller : 'profileCtrl',
		cache : true
	})
});
