app.service("customerDetailsService", ['$rootScope','$state','$http','__env',function($rootScope,$state, $http, __env) {
	var dilligence;

	this.sendDocsAuditor = function(payload, cb) {
		var req = {
			method: 'POST',
			url: __env.apiUrl + '/profile/alert/sendDocAlert',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			},
			data: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb();
			}
		}, function(error) {
			console.log("error");
		});
	}

	this.createRelationHistory = function(payload) {
		var req = {
			method: 'PUT',
			url: __env.apiUrl + '/profile/relationHistory/create',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			},
			data: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
				$state.go('home.dashboard');
			}
		}, function(error) {
			console.log("error");
		});
	}

    this.getCustomerDetails = function(cb){
		var payload = {
			"CustomerID": localStorage.getItem("CustomerID"),
		}
		console.log("payload::" + JSON.stringify(payload));

		var req = {
			method: 'GET',
			url: __env.apiUrl + '/profile/customer/get',
			headers: {
                'authorization': __env.BankID
			},
			params: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb( responseData );
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
	}
	
    this.getDilligence = function(cb){
		var payload = {
			"CustomerID": localStorage.getItem("CustomerID")
		}
		console.log("payload::" + JSON.stringify(payload));

		var req = {
			method: 'GET',
			url: __env.apiUrl + '/profile/diligence/get',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			},
			params: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb( responseData );
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
	}

    this.getMetaData = function(cb) {
		var payload = {
			"CustomerID": localStorage.getItem("CustomerID")
		}
		console.log("payload::" + JSON.stringify(payload));

		var req = {
			method: 'GET',
			url: __env.apiUrl + '/profile/metaTable/getDoc',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			},
			params: payload
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb(responseData);
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
    }
}]);
