angular.module('restClient', [])
.factory('restClient', ['$http', '$location', function(http, location) {

	var baseUrl = location.host();
	
	var apiUrl = "https://pada-server.herokuapp.com/rest";
	
	if( baseUrl === "localhost"){
		apiUrl = "http://localhost:8080/pada-server/rest";
	}

	var defaultErrorCallback = function(response){
		console.log(response);
	};
	
	var sendGetWithoutErrorCallback = function(successCallback, path){
		sendGet(successCallback, defaultErrorCallback, path);
	}
	
	var sendPostWithoutErrorCallback = function(successCallback, data, path){
		sendPost(successCallback, defaultErrorCallback, data, path);
	}
	
	var sendPostAsJsonWithoutErrorCallback = function(successCallback, data, path){
		sendPostAsJson(successCallback, defaultErrorCallback, data, path);
	}
	
	var sendGet = function(successCallback, errorCallback, path){
		
		http(
				{
					method : 'GET',
					url : apiUrl + path,
					headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
					transformRequest : function(obj) {
						var str = [];
						for ( var p in obj)
							str.push(encodeURIComponent(p) + "="
									+ encodeURIComponent(obj[p]));
						return str.join("&");
					}
				}
				).success(function(response) {
					successCallback(response);
					
				}).error(function(response){
					console.log(response)
					errorCallback(response);
				}); 
		
		
		
	};
	
	var sendPost = function(successCallback, errorCallback, data, path){
		
		http(
				{
					method : 'POST',
					url : apiUrl + path, 
					data : data,
					headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
					transformRequest : function(obj) {
						var str = [];
						for ( var p in obj)
							str.push(encodeURIComponent(p) + "="
									+ encodeURIComponent(obj[p]));
						return str.join("&");
					}
				}
		).success(function(response) {
			successCallback(response);
		}).error(function(response) {
			console.log(response)
			errorCallback(response);
		});
		
		
	};
	
	var sendPostAsJson = function(successCallback, errorCallback, data, path){
		
		http(
				{
					method : 'POST',
					url : apiUrl + path,
					data : data,
					headers: {'Content-Type' : 'application/json; charset=utf-8'},
				}
		).success(function(response) {
			successCallback(response);
		}).error(function(response) {
			console.log(response)
			errorCallback(response);
		});
		
		
	};
	
	
  return {
	sendGetWithoutErrorCallback: sendGetWithoutErrorCallback,
	sendPostWithoutErrorCallback: sendPostWithoutErrorCallback,
	sendPostAsJsonWithoutErrorCallback: sendPostAsJsonWithoutErrorCallback,
	sendGet: sendGet,
    sendPost: sendPost,
    sendPostAsJson: sendPostAsJson
  };
}]);