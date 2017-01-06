dashboardCtrl.$inject = ['$scope', '$state', 'dashboardService'];
app.controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($scope, $state, dashboardService) {
	$scope.showLoader=true;
	$scope.natural = true;

	function loadCustomerData() {
		$scope.customerList = [];
		$scope.showLoader=true;
        dashboardService.getCustomerProfileDetails(function(profiles){
        	$scope.showLoader=false;
            $scope.customerList = profiles;
        });
	};
	
    $scope.customerProfile = function(customer){
    	console.log("customer::"+JSON.stringify(customer));
        localStorage.setItem("CustomerID",customer.CustomerID);
		localStorage.setItem("page", "dashboard");
        $state.go('home.profile');
    };

	$scope.switchToNatural = function(){
		$scope.natural = true;
	}
	
	$scope.switchToCorporate = function(){
		$scope.natural = false;
	}
	
	$scope.addCustomer = function(){
		$state.go('home.customer');
	}
	
	loadCustomerData();
    
}
