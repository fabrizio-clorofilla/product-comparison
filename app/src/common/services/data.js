'use strict';

angular.module('comparisonToolApp')
	.service('DataService', function DataService($http, $q) {

		var oData = null;
		var oProductBoxes = {};

		var init = function() {
			var d = $q.defer();
			// Retrieving the JSON with the tools' configuration
			// API running on NodeJS/ExpressJS platform (check the 'server' folder)
			$http.get('http://localhost:3000/config').
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				d.resolve(data);
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log('Failed to load config JSON')
				d.reject(data);
			});
			return d.promise;
		}

		// Function to allow product boxes to register themselves in the DataService
		var registerProductBox = function(scopeid,item) {
			oProductBoxes[scopeid] = item;
		}

		// Function to check if any product selection has been made (to hide message div)
		var isAnyProductSelected = function() {
			var response = false;
			for(var key_ in oProductBoxes){
				response = response || ((oProductBoxes[key_] == null) ? false : true);
			}
			return !response;
		}

		return {
			initData: init,
			registerProductBox: registerProductBox,
			isAnyProductSelected: isAnyProductSelected
		}

	});
	