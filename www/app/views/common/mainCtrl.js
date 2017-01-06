mainCtrl.$inject = ['$scope', '$state','$rootScope','__env','dashboardService'];
app.controller('mainCtrl', mainCtrl);

function mainCtrl($scope, $state,$rootScope,__env, dashboardService) {
	$scope.profileImg = __env.profileImg;
	$scope.logoUrl = __env.logoUrl;
	$scope.toggleAlert = false;
    
    $scope.logout = function(){
    	$state.go('login');
    }
    
    function loadAlerts() {
		$scope.showLoader=true;
		$scope.alerts = [];
        dashboardService.getAlerts(function(alerts){
        	$scope.showLoader=false;
            $scope.alerts = alerts
        });
	};
	
	$scope.showAlert = function(alert){
        // add local storage variable to tell next page it's from alert or customer list
        localStorage.setItem("CustomerID",alert.CustomerID);
		localStorage.setItem("page", "alert");
        localStorage.setItem("alertBody", JSON.stringify(alert));
        $rootScope.$broadcast("EVENT");
        $state.go('home.profile');
    }
    
    loadAlerts();
     
}
