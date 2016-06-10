padaApp.controller('purchasesController', ['$scope' ,'restClient', function(scope, restClient) {
	
	//Mercados
	scope.getAllStoresOk = function(response){
		scope.stores = response;
	};
	restClient.sendGetWithoutErrorCallback(scope.getAllStoresOk, '/stores/all');

	//Date picker
	scope.format = 'shortDate';
	scope.options = {
	    showWeeks: false,
	    maxDate: new Date()
	};
	
	//Ingredientes
	scope.getAllIngsOk = function(response){
		scope.allIngredients = response;
	};
	restClient.sendGetWithoutErrorCallback(scope.getAllIngsOk, '/ingredients/all');
	
	//Agregar ingrediente a compra
	scope.addPurchase = function(){
		console.log("Agregando ingrediente a compra");
	}
}]);	