var padaApp = angular.module('padaApp', ['ngRoute','smart-table','ngAnimate', 'ui.bootstrap','restClient'], function($routeProvider, $locationProvider) {
 
	$routeProvider
		.when('/sales', {
        	templateUrl : '/pada-ui/views/sales.html',
        	controller: 'salesController'
		})
	    .when('/ingredients', {
	        templateUrl : '/pada-ui/views/ingredients.html',
	        controller: 'ingredientsController'
	    })    
	    .when('/products', {
            templateUrl : '/pada-ui/views/products.html',
            controller: 'productsController'
        })
        .when('/clients', {
            templateUrl : '/pada-ui/views/clients.html',
            controller: 'clientController'
        })
        .when('/stores', {
            templateUrl : '/pada-ui/views/stores.html',
            controller: 'storesController'
        })
        .when('/purchases', {
            templateUrl : '/pada-ui/views/purchases.html',
            controller: 'purchasesController'
        })
//        .otherwise( { redirectTo: '/'} );

    
//    $locationProvider.html5Mode(true);
});



