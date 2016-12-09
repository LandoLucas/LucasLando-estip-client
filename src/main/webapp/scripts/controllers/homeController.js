padaApp.controller('homeController',['$scope', 'AuthenticationService' , function(scope, AuthenticationService) {
	
	scope.logout = function() {
		console.log("loging out")
		AuthenticationService.ClearCredentials();
	}
	
}]);	