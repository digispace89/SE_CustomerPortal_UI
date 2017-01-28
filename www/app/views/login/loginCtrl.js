LoginCtrl.$inject = ['$scope', '$state', 'commonService', 'loginService'];
app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, commonService, loginService) {

	$scope.Login = function() {
		$scope.showLoader = true;
		loginService.scope = $scope;
		loginService.getCustomerByEmail($scope.data.email, $scope.data.password, function(cb) {
			if ( typeof cb != "undefined" && cb != "" && cb != null) {
				console.log("cb::" + JSON.stringify(cb));
				if(cb.password != $scope.data.password){
					$scope.msg = "Invalid Password";
				} else{
					$state.go('home.dashboard');
				}
			}else if(cb.status==404){
				$scope.msg = "Email Id does not exist";
			}
			$scope.showLoader = false;

		});

	};

	$scope.createAccount = function() {
		$state.go('createAccount');
	};

}
