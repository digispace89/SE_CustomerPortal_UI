customerCtrl.$inject = ['$scope', '$state', 'customerDetailsService','dialogManagerService','verificationService','idValidationService','basicIdService', '__env','$window','$filter','$http'];
app.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, $state, customerDetailsService,dialogManagerService,verificationService,idValidationService,basicIdService, __env,$window,$filter,$http) {
	$scope.showNaturalform = true;
	//TODO : Remove if not needed
	/*$scope.showTable = false;*/
	$scope.consent = false;
	$scope.searchData = {
		idTypeOptions : [{
			id : '1',
			name : 'Natual Person'
		}, {
			id : '2',
			name : 'Legal Person'
		}],
		
        selectedidTypeOption : {
            id : '1',
            name : 'Natural Person'
        },
        //This sets the default value of the select in the ui
		countries : [{
			id : '1',
			name : 'India'
		}, {
			id : '65',
			name : 'Singapore'
		}, {
			id : '86',
			name : 'China'
		}, {
			id : '2',
			name : 'Japan'
		}, {
			id : '2',
			name : 'Pakistan'
		}, {
			id : '2',
			name : 'Afghanistan'
		}, {
			id : '2',
			name : 'Myanmar'
		}],
		selectedCountry : {
			id : '65',
			name : 'Singapore'
		},
        firstName: "Test",
        lastName: "",
        companyName : "Theta Accounting Corporation",
        dob: new Date("2015-08-03"),
	};
	
	//This sets the default value of the select in the ui
	    $scope.onIdTypeChange = function(selectedId) {
		if(selectedId.id == 1){
			$scope.showNaturalform = true;
		}else if (selectedId.id == 2){
			$scope.showNaturalform = false;
		}else{
			$scope.showNaturalform = true;
		}		
        $scope.searchData.firstName = "";
		$scope.searchData.lastName = "";
		$scope.searchData.dob = "";
	}
    
    $scope.checkExist = function() {
    	$scope.showLoader=true;
        
        
        var payload = {
                "CustomerType" : parseInt($scope.searchData.selectedidTypeOption.id),
                "FirstName" : $scope.searchData.firstName,
                "Mi" : null,
                "LastName" : $scope.searchData.lastName,
                "SuffixName" : null,
                "BirthCountry" : parseInt($scope.searchData.selectedCountry.id),
                "BirthDate" : $filter('date')($scope.searchData.dob, "yyyy-MM-dd")
         };

        basicIdService.checkExist(payload,function(cb){
        	$scope.showLoader=false;
        	console.log("cb::"+JSON.stringify(cb));
        	if(cb.Existed == 0){
                $scope.consent = false;
                console.log($scope.consent)
                angular.element('#next').triggerHandler('click');
        	}else if(cb.Existed == 1) {
        		$scope.consent = true;
                console.log($scope.consent)
        		angular.element('#next').triggerHandler('click');
        		/*proofUpload();*/
        	}
        });
    }
    
    /*Create Id*/
    $scope.verificationdata = {
        idTypeOptions: [
            {id: '1', name: 'NRIC'},
            {id: '2', name: 'Birth Certificate'},
            {id: '3', name: 'Passport'},
            {id: '5', name: 'Registered Company'}
        ],
        selectedidTypeOption: {id: '5', name: 'Registered Company'},  //This sets the default value of the select in the ui
        idCardNumber: 'S7859465G',
        dob: new Date("2015/08/23"),
        address: "100 Woodlands Drive",
        postcode: "123456",
        validDate: new Date("2016/02/23"),
        registNumber: "197501566C",
        
        
        singaporeIdCardColours: [
            {id: '1', name: 'red'},
            {id: '2', name: 'blue'},
        ],
        selectedIdCardColor: {id: '2', name: 'blue'}, //This sets the default value of the select in the ui
        
        sex: [
            {id: '1', name: 'M'},
            {id: '2', name: 'F'},
        ],
        selectedSex: {id: '1', name: 'M'},
        
        countries :[
            {id: '1', name: 'India'},
            {id: '65', name: 'Singapore'},
            {id: '2', name: 'China'},
            {id: '2', name: 'Japan'},
            {id: '2', name: 'Pakistan'},
            {id: '2', name: 'Afghanistan'},
            {id: '2', name: 'Myanmar'}
        ],
        selectedCountry: {id: '65', name: 'Singapore'},
    };
    
    $scope.open = function() {
    	$scope.showLoader=true;
    	var payload = {
			"CustomerID" : localStorage.getItem('CustomerID'),
			"BankID" : __env.BankID,
			"CustomerType" : 2,
			"ID" : [{
				"IDType" : parseInt($scope.verificationdata.selectedidTypeOption.id), // TODO: take from selector
				"State" : 1,
				"ValidTillDate" : moment($scope.verificationdata.validDate).format("YYYY-MM-DD"), // TODO: take from form
				"Provenance" : {
					"Source" : "Customer",
					"LoginName" : "Banker 14"
				},
				"RawData" : {
					"RegisteredAddress" : {
						"Address1" : $scope.verificationdata.address, // TODO: form
						"City" : "Singapore",
						"State" : "Singapore",
						"Country" : 65,
						"Postal" : $scope.verificationdata.postcode, // TODO: form
					},
					"RegistrationDate" : $scope.verificationdata.dob, // TODO: form
					"RegistrationCountry" : $scope.verificationdata.selectedCountry, // TODO: form
					"RegistrationNumber" : $scope.verificationdata.registNumber
				},
				"VerifiedDate" : moment(new Date()).format("YYYY-MM-DD"), // TODO: moment
				"IDHash" : "bac1601ce963010451188f0f75995b8ca4bd440e931bda8140630c023350f826"
			}, {
				"IDType" : 1,
				"State" : 1,
				"VerifiedDate" : "2015-07-03",
				"ValidTillDate" : null,
				"IDRawData" : {
					"IdentityCardColor" : "blue",
					"IdentityCardNo" : "S1234567A",
					"Sex" : "M",
					"BirthDate" : "1990-08-22",
					"BirthCountry" : 65,
					"IssueDate" : "2010-03-06"
				},
				"Provenance" : {
					"Source" : "Customer",
					"LoginName" : "Bank User A"
				}
			}]
		};
    	$scope.create=[];
    	verificationService.createId(payload,function(create){
            //wait for 3 seconds for the IDs to be created in backend
            setTimeout(proofUpload, 3000);
    		console.log("Created Id::"+JSON.stringify(create));
    	});
   };
   
   /*Dialog Mangager*/
  
  var cddPayload = {
	"CustomerID" : "",
	"BankID" : __env.BankID,
	"Diligence" : {
		"CreationDate" : moment(new Date()).format("YYYY-MM-DD"),
		"Metadata" : {
			"ContactNumber" : {
				"Mobile" : "94495999",
				"Home" : "61853688",
				"Fax" : "68734268"
			},
			"Address" : {
				"Address1" : "Changi Crescent",
				"State" : "Singapore",
				"Postal" : "353294",
				"Country" : 65,
				"City" : "Singapore"
			}
		},
		"Document" : [{
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 14"
			},
			"DocType" : 1,
			"State" : 1,
			"DocumentProof" : {
				"DocHash" : "fb4a91a6778412c1d6eda13b54d16a70b98fd10836295f16ad77d2b448301937",
				"ProofType" : 1,
				"Provider" : "Customer"
			},
			"ExpirationDate" : null,
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}, {
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 2"
			},
			"DocType" : 1,
			"State" : 1,
			"DocumentProof" : {
				"DocHash" : "d4d510bf10ec36c50c1bdd07e3d065bc956ccc876e701438c9b60a586d142fdd",
				"ProofType" : 4,
				"Provider" : "Customer"
			},
			"ExpirationDate" : moment(new Date()).add(6, 'months').format("YYYY-MM-DD"),
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}, {
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 18"
			},
			"DocType" : 2,
			"State" : 1,
			"DocumentProof" : {
				"DocHash" : "6dab0bd941b373273eb199ea9ebd0eb5b2d1d269882733720e9b921371f4a25f",
				"ProofType" : 8,
				"Provider" : "Customer"
			},
			"ExpirationDate" : moment(new Date()).add(12, 'months').format("YYYY-MM-DD"),
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}, {
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 1"
			},
			"DocType" : 2,
			"State" : 1,
			"DocumentProof" : {
				"DocHash" : "7bd3e0695b507e6b2495528aa701d820981bea324223871c2ae91e2d4279b936",
				"ProofType" : 9,
				"Provider" : "Customer"
			},
			"ExpirationDate" : moment(new Date()).add(12, 'months').format("YYYY-MM-DD"),
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}, {
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 0"
			},
			"DocType" : 3,
			"State" : 1,
			"DocumentProof" : {
				"ListType" : 1,
				"Found" : true,
				"Provider" : "Thomson Reuters"
			},
			"ExpirationDate" : moment(new Date()).add(12, 'months').format("YYYY-MM-DD"),
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}, {
			"Provenance" : {
				"Source" : "Customer",
				"LoginName" : "Banker 10"
			},
			"DocType" : 4,
			"State" : 1,
			"DocumentProof" : {
				"DialogResult" : "dialog output"
			},
			"ExpirationDate" : moment(new Date()).add(12, 'months').format("YYYY-MM-DD"),
			"CreationDate" : moment(new Date()).format("YYYY-MM-DD")
		}]
	}
};
   
   $scope.dialogData = {
		question : "Sample Question",
		answerOptions : [{
			id : '1',
			name : 'Yes'
		}, {
			id : '2',
			name : 'No'
		}],
		selectedAnswer : {
			id : '1',
			name : "Yes"
		},
		passport : false,
		NRIC : false,
		birthCert : false,
		proofAddress : false,
		index : 1,
		alias : "DL",
		nationality : "Singapore",
		contactNo : "71234567",
		address1 : "100 Woodland Drive",
		formEnabled : false,
	};
	
	function updateQuestionAnswers(responseData) {
		if(responseData.current_node.node_actions.length === 0) {
			return false
		}

		$scope.dialogData.question = responseData.current_node.node_question;
		$scope.dialogData.answerOptions = [];
		var answers = responseData.current_node.node_actions.map(function(cur, index) {
			return {
				id : (index + 1).toString(),
				name : cur.action_display_text
			}
		});
		$scope.dialogData.answerOptions = answers;
		return true;
	};
	
    function init() {
		$scope.showLoader = true;
		var payload = {
		}
		dialogManagerService.firstQuest(payload, function(cb) {
			if( typeof cb.data != "undefined" && cb.data != "" && cb.data != null) {
				var success = updateQuestionAnswers(cb.data);
				if(!success) {
					alert("no questions");
				}
			}
			$scope.showLoader = false;
		});

	}
	init();

	$scope.submit = function() {
		// refresh again
		$scope.showLoader = true;
		cddPayload.CustomerID = localStorage.getItem("CustomerID");
		dialogManagerService.submit(cddPayload, function(cb){
			$scope.showLoader = false;
		})
	}

	$scope.checkAnswer = function() {
		$scope.showLoader = true;
		$scope.lastQuestion = false;
		var answer = parseInt($scope.dialogData.selectedAnswer.id);

		switch($scope.dialogData.index) {
			case 1:
				$scope.dialogData.NRIC = (answer === 1 ? true : false);
				$scope.dialogData.index++;
				break;
			case 2:
				$scope.dialogData.birthCert = (answer === 1 ? true : false);
				$scope.dialogData.index++;
				break;
			case 3:
				$scope.dialogData.passport = (answer === 1 ? true : false);
				$scope.dialogData.index++;
				break;
			case 4:
				$scope.dialogData.proofAddress = (answer === 1 ? true : false);
				$scope.dialogData.index++;
				break;
			default:
				$scope.dialogData.index++;
		}

		var payload = {
			"answer" : answer - 1
		}
		console.log("payload::" + JSON.stringify(payload));

		dialogManagerService.checkAnswer(payload, function(cb) {
			if( typeof cb.data != "undefined" && cb.data != "" && cb.data != null) {
				if(cb.data.result == "finish"){
					alert("That's all the questions");
					$scope.dialogData.formEnabled = true;
				}else{
				var success = updateQuestionAnswers(cb.data);
				if(!success) {
					alert("That's all the questions");
					$scope.lastQuestion = true;
					$scope.dialogData.formEnabled = true;
				}}
				
			}
			$scope.showLoader = false;
		})
	}
	
	/*Proof upload*/
	$scope.addNewID = function() {
        $state.go('idVerification');
    }
    $scope.startCDD = function() {
        angular.element('#next').triggerHandler('click');
    }
    $scope.goProfile = function() {
        localStorage.setItem("page", "validation");
        $state.go('customerDetails');
    }
	$scope.verify = function() {
		console.log("verify")
		idValidationService.validateID();
	}
    $scope.screen = function() {
        idValidationService.screening(customerName);
    }

    function proofUpload() {
    	$scope.showLoader=true;
        //profile/metaTable/get
        idValidationService.getIDs(function(data){
        	$scope.showLoader=false;
        	$scope.selectedItems = 0;
            initCheckBox();
            var customer = JSON.parse(localStorage.getItem('customer'));
            customerName = customer.Metadata.Name.First;
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
    
    /*Approve or reject consent*/
   $scope.approve = function () {
   	$scope.showLoader=true;
   		var data={};
        data.BankID = __env.BankID;
        data.Consent = {
            "CreationDate": moment(new Date()).format("YYYY-MM-DD"),
            "TermCondition": "I agree to put my data on Blockchain.",
            "LoginName": "Bank User A"
        };
        var storedData = JSON.parse(localStorage.getItem("customer"));
        data.CustomerType = storedData.CustomerType;
        data.Metadata = storedData.Metadata;
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
                angular.element('#next').triggerHandler('click');
                localStorage.setItem("CustomerID", responseData.CustomerID);
            }
            $scope.showLoader=false;
        }, function(error) {
            console.log("error");
            $scope.showLoader=false;
        });
    };
    
    $scope.reject = function () {
        angular.element('#prev').triggerHandler('click');
    };
    
    $scope.customerProfilePage = function (customer) {
    	localStorage.setItem("page", "consent");
    	if(customer.selectedidTypeOption.id == 1)
    	{
    		localStorage.setItem("CustomerName", customer.firstName+""+customer.lastName);
    	}else{
    		localStorage.setItem("CustomerName", customer.companyName);
    	}
    	$state.go('home.profile');
    }
    
    /*Upload file*/
   $scope.chooseNric = function(){
   	$("#filepath1").click();
   }

	$scope.chooseregDoc = function(){
   	$("#filepath2").click();
   }
   
   $scope.choosePassport = function(){
   	$("#filepath3").click();
   }
   
   $scope.chooseAddressProof = function(){
   	$("#filepath4").click();
   }
  	
}

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

