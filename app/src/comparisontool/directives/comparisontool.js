'use strict';

angular.module('comparisonToolApp')
  .directive('comparisonTool', function () {
    return {
      templateUrl: '/src/comparisontool/views/comparisontool.html',
      restrict: 'E',
      scope: true,
      controller: function ($scope, $element, $attrs, DataService){

	  		$scope.data = {};
      	$scope.boxes = $attrs.boxes;

				DataService
					.initData()
						.then(function(d){
							$scope.data.items = d.items[$attrs.category];
							$scope.data.specs = d.specs[$attrs.category];
						},function(d){
							console.log('Failed to Load Data');
						}
					);

				// $scope.resultsAvailable = function() {
				// 	var results = false;
				// 	for(var i = 0; i < $scope.selectedItem.length; i++){
				// 		results = (results || ($scope.selectedItem[i] != null));
				// 	}
				// 	return results;
				// }
				
				// $scope.getData = function(){
				// 	return $scope.d;
				// }

      	$scope.range = function(i) { return parseInt(i)?$scope.range(i-1).concat(parseInt(i)):[]; };

      },
      link: function (scope, element, attrs) {
        // element.text('this is the Comparison Tool directive');
      }
    };
  });
