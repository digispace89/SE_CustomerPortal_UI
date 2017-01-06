headerController.$inject = ['$scope', '__env'];
app.controller('headerController', headerController);

function headerController($scope,__env) {
    $scope.logoUrl = __env.logoUrl;
    $scope.headerStyle = __env.headerStyle;
    $scope.bankOfficer = __env.bankOfficer;
    $scope.profileImg = __env.profileImg;
}
