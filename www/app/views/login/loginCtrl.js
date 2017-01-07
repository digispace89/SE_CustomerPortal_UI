LoginCtrl.$inject = ['$scope', '$state','commonService', 'loginService'];
app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state,commonService, loginService) {
	
	$scope.Login = function() {
			commonService.showLoader();
			loginService.scope = $scope;
			loginService.getAuthToken($scope.data.email, $scope.data.password);
		
	};
	
	$scope.createAccount = function (){
		$state.go('createAccount');
	};

}
