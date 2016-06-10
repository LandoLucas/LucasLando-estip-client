angular.module('restClient', [])
.factory('restClient', ['$http', function(http) {

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
					url : "http://localhost:8080/pada-server/rest" + path,
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
					url : "http://localhost:8080/pada-server/rest" + path,
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
					url : "http://localhost:8080/pada-server/rest" + path,
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