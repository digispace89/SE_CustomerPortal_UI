newAccountCtrl.$inject = ['$scope', '$state','commonService', 'loginService'];
app.controller('newAccountCtrl', newAccountCtrl);

function newAccountCtrl($scope, $state,commonService, loginService) {
	
	$scope.login = function(){
		$state.go('login');
	}
}
