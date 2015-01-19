'use strict';

angular.module('comparisonToolApp')
  .controller('MainCtrl', function ($scope, DataService) {

  		$scope.data = {};
  		$scope.selectedItem = [];
  		// using 'laptops' as default, but the category for the comparison could be passed in the div as an attribute
			// and the comparison tool could be easily implemented for different categories with one source code
  		$scope.category = 'laptops';

			DataService
				.initData()
					.then(function(d){
						
						$scope.data.items = d.items[$scope.category];
						$scope.data.specs = d.specs[$scope.category];

					},function(d){
						console.log('Failed to Load Data');
					}
				);

			$scope.resultsAvailable = function() {
				var results = false;
				for(var i = 0; i < $scope.selectedItem.length; i++){
					results = (results || ($scope.selectedItem[i] != null));
				}
				return results;
			}
			
			// $scope.getData = function(){
			// 	return $scope.d;
			// }
  });
