profileCtrl.$inject = ['$scope', '$state','$rootScope','idValidationService','customerDetailsService'];
app.controller('profileCtrl', profileCtrl);

function profileCtrl($scope, $state,$rootScope,idValidationService, customerDetailsService) {
	$scope.checkedImagePath = "../resources/assets/documentVerification/Ico_PDF_checked.png";
    $scope.rejectedImagePath = "../resources/assets/documentVerification/Ico_PDF_Reject.png";
	$scope.fileNameMapping = [ 
           "IDENTITY_PROOF",
           "VERIFICATION_PROOF",
           "SCREENING_RESULTS",
           "CDD_ANSWERS",
	];
	$scope.showLoader=true;
	$scope.open = false;
    $scope.showRevoke = false;
    $scope.sendAuditorFlag = false;
    $scope.State = 1;
    $rootScope.$on("EVENT", function(event, message){
        switchPage();
    });
    
	$scope.getPath = function(state) {
		if(state == 1)
			return $scope.checkedImagePath;
		if(state == 2)
			return $scope.rejectedImagePath;
	}
	
    $scope.recentActivity = true;
    $scope.documents = false;
    $scope.Ids = false;

    $scope.switchToRecentActivity = function(){
        $scope.recentActivity = true;
        $scope.documents = false;
        $scope.Ids = false;
    }	

    $scope.switchToDocuments = function(){
        $scope.documents = true;
        $scope.Ids = false;
        $scope.recentActivity = false;
    }	

    $scope.switchToIds = function(){
        $scope.Ids = true;
        $scope.recentActivity = false;
        $scope.documents = false;
        proofUpload();
    }

    function initCheckBox() {
        var checkState = '';
        function countChecked() {
            if (checkState === 'all') {
                $(".bulk_action input[name='table_records']").iCheck('check');
            }
            if (checkState === 'none') {
                $(".bulk_action input[name='table_records']").iCheck('uncheck');
            }

            var checkCount = $(".bulk_action input[name='table_records']:checked").length;
            $scope.selectedItems = checkCount;
            console.log($scope.selectedItems);
            $scope.$digest(); // we must call $scope.$digest() to update data bindings

            if (checkCount) {
                $('.column-title').hide();
                $('.bulk-actions').show();
                $('.action-cnt').html(checkCount + ' Records Selected');
            } else {
                $('.column-title').show();
                $('.bulk-actions').hide();
            }
        }
        $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });
        // /iCheck
        $('table input').on('ifChecked', function () {
            checkState = '';
            $(this).parent().parent().parent().addClass('selected');
            countChecked();
        });
        $('table input').on('ifUnchecked', function () {
            checkState = '';
            $(this).parent().parent().parent().removeClass('selected');
            countChecked();
        });


        $('.bulk_action input').on('ifChecked', function () {
            checkState = '';
            $(this).parent().parent().parent().addClass('selected');
            countChecked();
        });
        $('.bulk_action input').on('ifUnchecked', function () {
            checkState = '';
            $(this).parent().parent().parent().removeClass('selected');
            countChecked();
        });
        $('.bulk_action input#check-all').on('ifChecked', function () {
            checkState = 'all';
            countChecked();
        });
        $('.bulk_action input#check-all').on('ifUnchecked', function () {
            checkState = 'none';
            countChecked();
        });
    }

    function proofUpload() {
        $scope.showLoader=true;
        //profile/metaTable/get
        idValidationService.getIDs(function(data){
            $scope.showLoader=false;
            $scope.selectedItems = 0;
            initCheckBox();
            $scope.table = data.Id;
            $scope.startCDDFlag = data.State === 2 ? true : false;
            console.log("$scope.startCDDFlag::"+data.State);
            localStorage.setItem("docs", JSON.stringify(data.Doc));
            $scope.$watch('table', function(table){
                var selectedItems = 0;
                angular.forEach(table, function(table){
                    selectedItems += table.selected ? 1 : 0;
                })
                $scope.selectedItems = selectedItems;
            }, true);
        })
    }	
    
    function switchPage() {
        var fromPageName = localStorage.getItem('page');
        console.log("fromPageName::"+fromPageName);
        $scope.showLoader = true;
        switch(fromPageName) {
            case "consent":
            case "dashboard":
                customerDetailsService.getCustomerDetails(function(d){
                    console.log(d);
                    $scope.showLoader = false;
                    $scope.docs = d.Profiles[0].Diligence.Document;
                    $scope.State = d.Profiles[0].State;
                    $scope.customerName = d.Profiles[0].Metadata.Name.First + " " + d.Profiles[0].Metadata.Name.Last;
                    if(d.Profiles[0].State === 2) {
                        $scope.showRevoke = true;
                    } else {
                        $scope.showRevoke = false;
                    }
                });
                break;
            case "alert":
                customerDetailsService.getCustomerDetails(function(d){
                    console.log(d);
                    $scope.showLoader = false;
                    $scope.docs = d.Profiles[0].Diligence.Document;
                    $scope.Diligence = d.Profiles[0].Diligence;
                    $scope.State = d.Profiles[0].State;
                    $scope.customerName = d.Profiles[0].Metadata.Name.First + " " + d.Profiles[0].Metadata.Name.Last;
                    $scope.sendAuditorFlag = true;
                });
                break;
            case "validation":
                $scope.showLoader = false;
                $scope.docs = JSON.parse(localStorage.getItem('docs'));
                console.log("scope.docs::"+$scope.docs);
                console.log($scope.docs);
                $scope.State = 1; // TODO: this hardcode is needed because we want breadcrumb to show single red box. Remove in future
                break;
        }
    }

    switchPage();
    
    $scope.openSuccessModal = function(){
		$("#successModal").modal("show");
		$scope.popupContent = "This document is valid.";
	}
    
    $scope.approve = function() {
		var date = new Date();
		var payload = {
			"CustomerID": localStorage.getItem("CustomerID"),
			"BankID": __env.BankID,
			"State": 2,
			"RelationHistory": [
				{
					"Date": moment(date).format('YYYY-MM-DD'),
					"State": 1
				}
			]
		}

		console.log("payload::" + JSON.stringify(payload));

		customerDetailsService.createRelationHistory(payload);
	}

	$scope.revoke = function() {
		
	}

	$scope.reject = function() {
		var date = new Date();
		var payload = {
			"CustomerID": localStorage.getItem("CustomerID"),
			"BankID": __env.BankID,
			"State": 3,
			"RelationHistory": [
				{
					"Date": moment(date).format('YYYY-MM-DD'),
					"State": 2
				}
			]
		}
		console.log("payload::" + JSON.stringify(payload));
		customerDetailsService.createRelationHistory(payload);
	}

	$scope.sendDocsAuditor = function() {
		var alertBody = JSON.parse(localStorage.getItem("alertBody"));
        // FIXME: TODO
		alertBody.Diligence = $scope.Diligence;
        alertBody.MessageBody = "Due Diligence Doc Received";
        customerDetailsService.sendDocsAuditor(alertBody, function(){
            alert("send documents to auditor successfully!");
            $scope.sendAuditorFlag = false;
            $state.go('home.dashboard');
        });
	}


}
