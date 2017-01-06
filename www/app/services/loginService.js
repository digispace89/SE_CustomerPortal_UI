/**
 * Login Service to authenticate user details and load events.
 **/
angular.module('demo').factory('loginService', function($state,commonService) {

	var login = {
		getAuthToken : function(username, password) {
			var offlineLoginData;
			serverUsername = "test";
			serverPassword = "test"
			if(serverUsername === username && serverPassword === password) {
				localStorage.setItem("loginstatus", JSON.stringify(true));
				commonService.hideLoader();
				$state.go('home.dashboard');
			} else {
				commonService.showErrorMessage();
				commonService.hideLoader();
			}

		},
	}
	return login;
});
