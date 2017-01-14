/**
 * Event Service
 */
app.service("dashboardService", ['$state', '$http', '__env',
function($state, $http, __env) {
	var customer;
	var alerts;

	this.getAlerts = function(cb) {
		console.log("get alerts");

		var req = {
			method : 'GET',
			url : __env.apiUrl + '/profile/alert/get',
			headers : {
				'Content-Type' : 'application/json',
				'authorization' : __env.BankID
			}
		};

		$http(req).then(function(response) {
			var responseData = response.data;
			console.log("responseData::" + JSON.stringify(responseData));
			if ( typeof responseData == "undefined" && responseData == "") {
				alert("no response!");
			} else {
				cb(responseData);
			}
			cb(responseData);
		}, function(error) {
			console.log("error");
			cb(error);
		});
	};

	this.getBillDetails = function(cb) {

		var payload = {

		};
		console.log("payload::" + JSON.stringify(payload));
		//TODO: commented for testing
		/*
		 var req = {
		 method: 'GET',
		 url: __env.apiUrl + '/profile/customerList/get',
		 headers: {
		 'Content-Type': 'application/json',
		 'authorization': __env.BankID
		 }
		 };

		 $http(req).then(function(response) {
		 var responseData = response.data;
		 console.log(responseData);
		 if (typeof responseData == "undefined" && responseData == "") {
		 alert("no response!");
		 } else {
		 customer = responseData.Profiles;
		 cb(responseData.Profiles);
		 }
		 }, function(error) {
		 console.log("error");
		 cb(error);
		 });*/

		return billList;
	};
}]);
