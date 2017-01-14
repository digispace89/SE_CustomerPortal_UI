dashboardCtrl.$inject = ['$scope', '$state', 'dashboardService'];
app.controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $state, dashboardService) {
	//$scope.showLoader = true;

	function loadCustomerData() {
		$scope.customerList = [];
		
		/*
		 $scope.showLoader = true; 
		 dashboardService.getBillDetails(function(profiles){
		 $scope.showLoader=false;
		 console.log("profiles::"+JSON.stringify(profiles));
		 $scope.billList = profiles;
		 });*/

		$scope.billList = [{
			"billNumber" : "111",
			"billAmount" : "10000",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "112",
			"billAmount" : "5000",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "113",
			"billAmount" : "3500",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "114",
			"billAmount" : "2500",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "115",
			"billAmount" : "10000",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "116",
			"billAmount" : "11000",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "117",
			"billAmount" : "8800",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "118",
			"billAmount" : "3800",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}, {
			"billNumber" : "119",
			"billAmount" : "700",
			"billDate" : "14/01/2017",
			"dueDate" : "21/01/2017"
		}];

	};

	$scope.customerProfile = function(customer) {
		console.log("customer::" + JSON.stringify(customer));
		localStorage.setItem("CustomerID", customer.CustomerID);
		localStorage.setItem("page", "dashboard");
		$state.go('home.profile');
	};
	
	$scope.openBillPdf = function(){
		$("#successModal").modal("show");
		$scope.popupContent = "This document is valid.";
	};

	loadCustomerData();

}
