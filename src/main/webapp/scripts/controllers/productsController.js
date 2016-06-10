padaApp.controller('productsController', ['$scope' ,'restClient', function(scope, restClient) {
	
	//Valida que un producto siendo tipeado no exista ya en la lista cuando su nombre y cantidad combinada existan
	scope.productAlreadyExists = function(){
		
		if(scope.displayedCollection == null || scope.newProd == null 
				|| scope.newProd.quantity == null || scope.newProd.name == null ) return false;
		
		for(var i=0; i < scope.displayedCollection.length; i++){
			if ( scope.displayedCollection[i].name.toUpperCase() === scope.newProd.name.toUpperCase() &&  
			     scope.displayedCollection[i].quantity === scope.newProd.quantity
			   ) return true;
		}
		
		return false;
	};
	
	scope.removeProduct = function(prod){
		var data = {"name": prod.name,
					"quantity" : prod.quantity
				   };
		scope.removeOk = function(response) {
			for(var i=0; i < scope.displayedCollection.length; i++){
				if (scope.displayedCollection[i].name.toUpperCase() === prod.name.toUpperCase() &&
					scope.displayedCollection[i].quantity === prod.quantity	
				   ){ 
					scope.displayedCollection.splice(i);
				}
			}
		};
		restClient.sendPostWithoutErrorCallback(scope.removeOk, data, '/products/remove');
	};
	
	scope.save = function(){
		
		data = {'name' : scope.newProd.name,
				'price': scope.newProd.price,
				'quantity' : scope.newProd.quantity,
				'unit' : scope.newProd.unit
		};
		
		scope.saveOk = function(response) {
			scope.response = response;
			scope.displayedCollection.push(data);
				
			scope.newProdForm.$setPristine();
			scope.newProd.name = "";
			scope.newProd.price = "";
			scope.newProd.quantity = "";
			scope.newProd.unit = "";
		};		
					
		restClient.sendPostWithoutErrorCallback(scope.saveOk, data, '/products/save');
	};
	
	scope.getAllOk = function(response){
		scope.products = response;
		scope.displayedCollection = [].concat(scope.products);
	};
	scope.getUnitsOk = function(response){
		scope.units = response
	};
	
	restClient.sendGetWithoutErrorCallback(scope.getUnitsOk, '/ingredients/units');
	restClient.sendGetWithoutErrorCallback(scope.getAllOk, '/products/all');
	
	
	
}]);	