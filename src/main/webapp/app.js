var padaApp = angular.module('padaApp', ['ngRoute','smart-table','ngAnimate', 'ui.bootstrap','restClient'], function($routeProvider, $locationProvider) {
 
	$routeProvider
		.when('/sales', {
        	templateUrl : 'views/sales.html',
        	controller: 'salesController'
		})
	    .when('/ingredients', {
	        templateUrl : 'views/ingredients.html',
	        controller: 'ingredientsController'
	    })    
	    .when('/products', {
            templateUrl : 'views/products.html',
            controller: 'productsController'
        })
        .when('/clients', {
            templateUrl : 'views/clients.html',
            controller: 'clientController'
        })
        .when('/stores', {
            templateUrl : 'views/stores.html',
            controller: 'storesController'
        })
        .when('/purchases', {
            templateUrl : 'views/purchases.html',
            controller: 'purchasesController'
        })
        .otherwise( { redirectTo: '/sales'} );

    
//    $locationProvider.html5Mode(true);
});


