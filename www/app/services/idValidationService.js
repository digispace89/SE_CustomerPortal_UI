app.service("idValidationService", ['$rootScope','$state','$http','__env',function($rootScope,$state, $http, __env) {
    this.getIDs = function(cb) {
        var payload = {
            "CustomerID":localStorage.getItem('CustomerID')
        }
        console.log("payload::" + JSON.stringify(payload));

        var req = {
            method: 'GET',
            url: __env.apiUrl + '/profile/metaTable/get',
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
                responseData.Id.forEach(function(el){
                    switch(el.Type) {
                        case 1:
                            el.Type = "NRIC";
                            break;
                        case 2:
                            el.Type = "Birth Certificate";
                            break;
                        case 3:
                            el.Type = "Passport";
                            break;
                        case 4:
                            el.Type = "Incorporated Company";
                            break;
                        case 5:
                            el.Type = "Registered Company";
                            break;
                        default:
                            el.Type = "NRIC";
                    }

                    if(el.State === 1)
                        el.State = "Active";
                    else if(el.State === 0)
                        el.State = "Inactive";
                });

                cb(responseData);
            }
        }, function(error) {
            console.log("error");
            cb(error);
        });
    }
    this.getDilligence = function(cb) {
        var payload = {
            "CustomerID":localStorage.getItem('CustomerID'),
            // "BankID": __env.BankID
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
                // FIXME: TODO
                cb(responseData.Doc.length == 0);
            }
        }, function(error) {
            console.log("error");
            cb(error);
        });
    }

    this.validateID = function() {
		// FIXME: TODO
        var payload = {
			"CountryCode": 65,
			"IDNumber": "S8585175F"
        }
        console.log("payload::" + JSON.stringify(payload));

        var req = {
            method: 'GET',
            url: __env.apiUrl + '/profile/id/validate',
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
                // FIXME: TODO
                alert("External Service Verification. IDNumber: " + payload.IDNumber + ". Message: " + responseData.Message);
            }
        }, function(error) {
            console.log("error");
        });
    }

    this.screening = function(customerName) {
		// FIXME: TODO
        var payload = {
            "firstName": customerName
        }
        console.log("payload::" + JSON.stringify(payload));

        var req = {
            method: 'GET',
            url: __env.apiUrl + '/screening/search',
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
                // FIXME: TODO
				alert(responseData.Message);
            }
        }, function(error) {
            console.log("error");
        });
    }
}]);
