/**
 * Login Service to authenticate user details.
 **/
app.service("loginService", ['$state','$http','__env','commonService',function($state, $http, __env,commonService) {
	this.getCustomerByEmail = function(username, password,cb){
		var req = {
			method: 'GET',
			url: __env.apiUrl + '/customer',
			params: {email: username}
		};
		
		$http(req).then(function(response) {
			var responseData = response.data;
			console.log("logged in object::"+JSON.stringify(responseData));
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb( responseData);
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
           
			serverUsername = "test";
			serverPassword = "test";
			if(serverUsername === username && serverPassword === password) {
				localStorage.setItem("loginstatus", JSON.stringify(true));
				commonService.hideLoader();
				$state.go('home.dashboard');
			} else {
				commonService.showErrorMessage();
				commonService.hideLoader();
			}
		
	};
	
}]);

