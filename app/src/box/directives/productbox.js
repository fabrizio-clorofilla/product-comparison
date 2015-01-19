'use strict';

angular.module('comparisonToolApp')
  .directive('productBox', function () {
    return {
      templateUrl: '/src/box/views/productbox.html',
      restrict: 'E',
  		scope: true,
  		replace: true,
      controller: function ($scope, $element, $attrs) {
      	var debug = true;

    		// $scope.$watch($attrs.ngModel, function(newVal, oldVal) {
    	 //    if (newVal != oldVal || newVal != undefined || newVal != null) {
    	 //      $scope.item = newVal;
    	 //      if(newVal != null) $element.parent().removeClass('hidden');
    	 //      else $element.parent().addClass('hidden');
    	 //    }
    	 //  }, true);

        $scope.getSpecName = function(id){
					for(var i = 0; i < $scope.data.specs.length; i++){
						if($scope.data.specs[i].id == id) return $scope.data.specs[i].label;
					}
				}

      },
      link: function ($scope, $element, $attrs) {
        // element.text('this is the Product Box directive');

        var btnTag = $('<li>SELECT</li>');
        $(btnTag).click(function() {
        	open($element.find('select'))
        });
        $(btnTag).appendTo($element.parent().prev());

        function open(elem) {
            if (document.createEvent) {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                elem[0].dispatchEvent(e);
            } else if (element.fireEvent) {
                elem[0].fireEvent("onmousedown");
            }
        }

      	$scope.$watch('selectedItem', function(newVal, oldVal) {
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
