app.service("basicIdService", ['$rootScope', '$state', '$http', '__env', '$uibModal',
function($rootScope, $state, $http, __env, $uibModal) {
	var _this = this;

	this.createMetadata = function(payload, cb) {
		var req = {
			method : 'POST',
			url : __env.apiUrl + '/profile/consent/create',
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
				alert("no response!");
				cb(responseData);
			} else {
				cb(responseData);
				/*$state.go('idproofUpload');*/
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
	}

	this.checkExist = function(payload, cb) {
		var remapParams = function(d) {
			return {
				"CustomerType" : d.CustomerType,
				"Metadata" : {
					"Name" : {
						"First" : d.FirstName,
						"Mi" : d.Mi,
						"Last" : d.LastName,
						"Suffix" : d.SuffixName,
					},
					"BirthCountry" : d.BirthCountry,
					"BirthDate" : d.BirthDate,
				}
			}
		}
		var req = {
			method : 'GET',
			url : __env.apiUrl + '/profile/metadata/existID',
			headers : {
				'Content-Type' : 'application/json',
				'authorization' : __env.BankID
			},
			params : payload
		}

		localStorage.setItem("customer", JSON.stringify(remapParams(req.params)));
		console.log("payload::" + JSON.stringify(req.params));

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if( typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
				cb(responseData);
			} else if(responseData.Existed == 1) {
				localStorage.setItem("CustomerID", responseData.CustomerID);
				
				var data = remapParams(req.params);
				data.BankID = __env.BankID;
				data.Consent = {
					"CreationDate" : moment(new Date()).format("YYYY-MM-DD"),
					"TermCondition" : "",
					"LoginName" : ""
				};
				
				_this.createMetadata(data, function(cb) {
				});
				cb(responseData);
				//this.createMetadata(remapParams(req.params));
			} else if(responseData.Existed == 0) {
				cb(responseData);
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
	}
}]);
