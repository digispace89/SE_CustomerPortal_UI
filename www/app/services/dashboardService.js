/**
 * Event Service
 */
app.service("dashboardService", ['$rootScope','$state','$http', '__env',function($rootScope,$state, $http, __env) {
    var customer;
    var alerts;

    this.getAlerts = function(cb){
        console.log("get alerts");


		var req = {
			method: 'GET',
			url: __env.apiUrl + '/profile/alert/get',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			}
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log("responseData::"+JSON.stringify(responseData));
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                cb(responseData);
			}
			 cb(responseData);
		}, function(error) {
			console.log("error");
			cb(error);
		});
    }

    this.getCustomerProfileDetails = function(cb){

		var payload = {
            "BankID": __env.BankID
		}
		console.log("payload::" + JSON.stringify(payload));

		var req = {
			method: 'GET',
			url: __env.apiUrl + '/profile/customerList/get',
			headers: {
				'Content-Type': 'application/json',
                'authorization': __env.BankID
			}
		}

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log(responseData)
			if (typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
                customer = responseData.Profiles;
                cb(responseData.Profiles);
			}
		}, function(error) {
			console.log("error");
			cb(error);
		});
/*        return [{"customer":"Sarah Garza","abbr": "SG", "company":"Miboo","lastReviewDate":"5/18/2016","state":1},
{"customer":"Marie Ward","abbr": "MW","company":"Quire","lastReviewDate":"2/3/2016","state":2},
{"customer":"Sandra Collins","abbr": "SC","company":"Mydo","lastReviewDate":"3/23/2016","state":2},
{"customer":"Kathleen Moreno","abbr": "KM","company":"Tanoodle","lastReviewDate":"2/16/2016","state":1},
{"customer":"Ashley Sanchez","abbr": "AS","company":"Eidel","lastReviewDate":"12/3/2015","state":1},
{"customer":"Henry Ortiz","abbr": "HO","company":"Gigashots","lastReviewDate":"12/16/2015","state":2},
{"customer":"Lois Crawford","abbr": "LC","company":"Zooveo","lastReviewDate":"8/28/2016","state":2},
{"customer":"Timothy Adams","abbr": "TA","company":"Ntag","lastReviewDate":"3/2/2016","state":1},
{"customer":"Larry Fisher","abbr": "LF","company":"Meetz","lastReviewDate":"3/21/2016","state":1}];
    */
    }
}]);
