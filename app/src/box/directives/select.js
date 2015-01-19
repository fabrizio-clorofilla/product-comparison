'use strict';

angular.module('comparisonToolApp')
  .directive('select', function () {
    return {
      restrict: 'E',
      link: function postLink($scope, $element, $attrs) {

      	$scope.$watch($attrs.ngModel, function(newVal, oldVal) {
          if (newVal != oldVal || newVal != undefined || newVal != null) {
            // $scope.item = newVal;
            // if(newVal != null) $element.parent().removeClass('hidden');
            console.log('change in the model detected');

        	if(newVal == null){
				for(var i=0; i<$scope.data.items.length; i++) {
					if($scope.data.items[i].id == oldVal.id) $scope.data.items[i].isInUse = false;
				}
        	}
        	if(oldVal == null){
        		for(var i=0; i<$scope.data.items.length; i++) {
		        	if($scope.data.items[i].id == newVal.id) $scope.data.items[i].isInUse = true;
		        }
        	}
        	if(oldVal != null && newVal != null) {
        		if(oldVal.id != newVal.id){
	        		for(var i=0; i<$scope.data.items.length; i++) {
	        			if($scope.data.items[i].id == newVal.id) $scope.data.items[i].isInUse = true;
	        			if($scope.data.items[i].id == oldVal.id) $scope.data.items[i].isInUse = false;
	            	}
        		}
        	}

          }
        }, true);

      }
    };
  });
