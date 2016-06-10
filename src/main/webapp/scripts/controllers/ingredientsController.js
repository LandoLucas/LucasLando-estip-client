padaApp.controller('ingredientsController', ['$scope','$filter','restClient', function (scope,filter,restClient) {
	
	
	//Valida que un ingrediente siendo tipeado no exista ya en la lista
	scope.ingredientAlreadyExists = function(){
		
		if(scope.displayedCollection == null || scope.newIng == null || scope.newIng.name == null) return false;
		for(var i=0; i < scope.displayedCollection.length; i++){
			if (scope.displayedCollection[i].name.toUpperCase() === scope.newIng.name.toUpperCase()) return true;
		}
		
		return false;
	};
	
	
	scope.removeIngredient = function(ing){
		var data = {"name": ing.name};
		scope.removeOk = function(response) {
			for(var i=0; i < scope.displayedCollection.length; i++){
				if (scope.displayedCollection[i].name.toUpperCase() === ing.name.toUpperCase()) scope.displayedCollection.splice(i);
			}
		};
		restClient.sendPostWithoutErrorCallback(scope.removeOk, data, '/ingredients/remove');
	};
		
	
	scope.save = function(){
		
		data = {'name' : scope.newIng.name,
				'price': scope.newIng.price,
				'quantity' : scope.newIng.quantity,
				'brand' : scope.newIng.brand,
				'unit' : scope.newIng.unit
		};
		
		scope.saveOk = function(response) {
			scope.response = response;
			scope.displayedCollection.push(data);
				
			scope.newIngForm.$setPristine();
			scope.newIng.name = "";
			scope.newIng.price = "";
			scope.newIng.quantity = "";
			scope.newIng.unit = "";
			scope.newIng.brand = "";
		};		
					
		restClient.sendPostWithoutErrorCallback(scope.saveOk, data, '/ingredients/save');
	};
	
	scope.getUnitsOk = function(response){
		scope.units = response
	};
	
	scope.getAllOk = function(response){
		scope.ingredients = response;
		scope.displayedCollection = [].concat(scope.ingredients);
	};
	
	restClient.sendGetWithoutErrorCallback(scope.getUnitsOk, '/ingredients/units');
	restClient.sendGetWithoutErrorCallback(scope.getAllOk, '/ingredients/all');
}]);	