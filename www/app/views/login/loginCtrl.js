LoginCtrl.$inject = ['$scope', '$state','commonService', 'loginService'];
app.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state,commonService, loginService) {
	
	$scope.Login = function() {
			commonService.showLoader();
			loginService.scope = $scope;
			loginService.getCustomerByEmail($scope.data.email, $scope.data.password,function(cb) {
			console.log("cb::"+cb);
			/*
			if( typeof cb.data != "undefined" && cb.data != "" && cb.data != null) {
							var success = updateQuestionAnswers(cb.data);
							if(!success) {
								alert("no questions");
							}
						}
						$scope.showLoader = false;*/
			
		});
		
	};
	
	$scope.createAccount = function (){
		$state.go('createAccount');
	};

}
