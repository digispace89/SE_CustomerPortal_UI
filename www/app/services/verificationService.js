app.service("verificationService", ['$rootScope', '$state', '$http', '__env',
function($rootScope, $state, $http, __env) {

	this.createId = function(payload,cb) {
		var req = {
			method : 'PUT',
			url : __env.apiUrl + '/profile/id/create',
			headers : {
				'Content-Type' : 'application/json',
				'authorization' : __env.BankID
			},
			data : payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if( typeof responseData == "undefined" && responseData == "") {
				cb(responseData);
				alert("no response!");
			} else {
				cb(responseData);
				/*$state.go('idproofUpload');*/
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
	}
}]);
