app.service("dialogManagerService", ['$rootScope', '$state', '$http', '__env',
function($rootScope, $state, $http, __env) {
	
	this.firstQuest = function(payload,cb) {
		var req = {
			method: 'POST',
			url: __env.apiUrl + '/dialogManager/question/0',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID,
			},
			data: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				cb(responseData);
				alert("no response!");
			} else {
				cb(response);
			}
		}, function(error) {
			cb(error);
			console.log("error");
		});
	}

	this.checkAnswer = function(payload,cb) {
		var req = {
			method: 'POST',
			url: __env.apiUrl + '/dialogManager/question/1',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID,
			},
			data: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			if (typeof responseData == "undefined" && responseData == "") {
				cb(responseData);
				alert("no response!");
			} else{
				cb(response);
			}
		}, function(error) {
			cb(error);
			console.log("error");
		});
	}
	
	this.submit = function(payload, cb){
		var req = {
			method : 'PUT',
			url : __env.apiUrl + '/profile/diligence/create',
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
				alert("Customer due dilligence is completed successfully");
				cb(responseData);
				$state.go('home.dashboard')
			}
		}, function(error) {
			cb(error);
			console.log("error");
		});
	}
}]);
