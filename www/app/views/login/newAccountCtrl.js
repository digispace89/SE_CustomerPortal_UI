newAccountCtrl.$inject = ['$scope', '$state','commonService', 'loginService'];
app.controller('newAccountCtrl', newAccountCtrl);

function newAccountCtrl($scope, $state,commonService, loginService) {
	$scope.showPharmacyform = true;
	$scope.customerType= {
		idTypeOptions : [{
			id : '1',
			name : 'Pharmacy'
		}, {
			id : '2',
			name : 'Doctor'
		},
		{
			id : '3',
			name : 'Hospital'
		}],
		
        selectedidTypeOption : {
            id : '1',
            name : 'Pharmacy'
        },
	};
	
	//This sets the default value of the select in the ui
	    $scope.onCustomerTypeChange = function(selectedId) {
		if(selectedId.id == 1){
			$scope.showPharmacyform = true;
			$scope.showDoctorform = false;
			$scope.showHospitalform = false;
		}else if (selectedId.id == 2){
			$scope.showPharmacyform = false;
			$scope.showDoctorform = true;
			$scope.showHospitalform = false;
		}else if (selectedId.id == 3){
			$scope.showPharmacyform = false;
			$scope.showDoctorform = false;
			$scope.showHospitalform = true;
		}else{
			$scope.showPharmacyform = true;
			$scope.showDoctorform = false;
			$scope.showHospitalform = false;
		}		
        $scope.customerType.firstName = "";
		$scope.customerType.lastName = "";
		$scope.customerType.dob = "";
	};
	
	$scope.login = function(){
		$state.go('login');
	};
}
