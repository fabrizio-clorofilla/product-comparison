'use strict';

angular.module('comparisonToolApp')
	.service('DataService', function DataService($http, $q) {

		var oData = null;
		var init = function() {
			var d = $q.defer();
			// Retrieving the JSON with the tools' configuration
			$http.get('scripts/config.json').
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

		return {
			initData: init
		}

	});
	