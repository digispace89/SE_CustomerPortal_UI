/**
 * Common service for the eSiS App
 **/
angular.module('commonUtils', []).service("commonService", ['$rootScope','$state',function($rootScope,$state) {
	var commonUtils = this;
	commonUtils.showLoader = showLoader;
	commonUtils.hideLoader = hideLoader;
	commonUtils.showErrorMessage = showErrorMessage;

	/** Set authentication token for Later Access **/
	

	/**Show Angular Loader**/
	function showLoader(content, showBackdrop, maxWidth, showDelay) {
		
	};

	/**Hide Angular Loader**/
	function hideLoader() {
		
	};
	
	function showErrorMessage(){
		$("#err-container").css("display", visibility);
		$("#err-container span.text-draft").text(msg);

		return;
	}
	
    
}]);
