angular.module('demo').controller('popupController', ['$scope','$state','$uibModalInstance','$http','data', '__env',function ($scope, $state,$uibModalInstance,$http,data,__env) {
    $scope.approve = function () {
        data.BankID = __env.BankID;
        data.Consent = {
            "CreationDate": moment(new Date()).format("YYYY-MM-DD"),
            "TermCondition": "I agree to put my data on Blockchain.",
            "LoginName": "Bank User A"
        };

        var req = {
            method: 'POST',
            url: __env.apiUrl + '/profile/consent/create',
            headers: {
                'Content-Type': 'application/json',
                'authorization': __env.BankID
            },
            data: data
        }

        $http(req).then(function(response) {
            var responseData = response.data;
            console.log(responseData)
            if (typeof responseData == "undefined" && responseData == "") {
                alert("no response!");
            } else {
                $state.go('idVerification');
                $uibModalInstance.dismiss('cancel');
                localStorage.setItem("CustomerID", responseData.CustomerID);
            }
        }, function(error) {
            console.log("error");
        });
    };
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
