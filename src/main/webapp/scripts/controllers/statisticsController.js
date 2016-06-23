padaApp.controller('statisticsController', ['$scope' ,'restClient', function(scope, restClient) {
	
	scope.getAllSalesOk = function(response){
		scope.allSales = response;
		
		scope.thisYearSales = scope.allSales.filter( function(sale){ return new Date().getYear() === new Date(sale.date).getYear() } )
		
		scope.chartOne();
		scope.chartTwo();
	}
	
	
	scope.chartTwo = function(){
		
		scope.vm2016labels = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto",
		                      "Septiembre","Octubre","Noviembre","Diciembre"];
		scope.vm2016data = [];
		for (var month = 0; month < 12; month++) {
			
			var monthlySales = scope.thisYearSales.filter( function(sale){
				return month === new Date(sale.date).getMonth();
			} )

			scope.vm2016data.push(monthlySales.length)
		}
		
	}
	
	scope.chartOne = function(){
		var thisYearProducts = scope.thisYearSales.map( function(sale){ return sale.products} )
		
		var allProducts = [];
		thisYearProducts.map( function(a){ 
			a.map(function(b){ allProducts.push(b)})
		} )
		
		var allIDs = allProducts.map( function(p){
			return p.product.id
		} );
		
		var onlyUnique = function(value, index, self) { 
			return self.indexOf(value) === index;
		};
		
		var uniqueIDs = allIDs.filter( onlyUnique);
		
		scope.pv2016labels = [];
		scope.pv2016data = [];
		
		uniqueIDs.map( function(id){
				var ps = allProducts.filter( function(p){ 
							return p.product.id === id
					})
				
				var add = function(x,p){ 
					return p.quantity + x
				};
				var sold = ps.reduce(add , 0)
				
				scope.pv2016labels.push(ps[0].product.name);
				scope.pv2016data.push(sold);
			}
		);
	};
	
	restClient.sendGetWithoutErrorCallback(scope.getAllSalesOk, '/sales/all');
}]);	