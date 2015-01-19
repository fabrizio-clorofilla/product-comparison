'use strict';

angular.module('comparisonToolApp')
  .directive('specsTab', function (DataService) {
    return {
      template: '<div><p class="comparison-item-name"><strong>{{item.name}}</strong><br></p><p ng-repeat="(key, value) in item.specs">{{getSpecName(key)}}: {{value}}<p></div>',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope, $element, $attrs){
      	$scope.item = null;
      	$element.parent().addClass('hidden');
      },
      link: function($scope, $element, $attrs) {

      	$scope.$watch($attrs.ngModel, function(newVal, oldVal) {
          if (newVal != oldVal || newVal != undefined || newVal != null) {
            $scope.item = newVal;
            if(newVal != null) $element.parent().removeClass('hidden');
            else $element.parent().addClass('hidden');
          }
        }, true);

        $scope.getSpecName = function(id){
					for(var i = 0; i < $scope.data.specs.length; i++){
						if($scope.data.specs[i].id == id) return $scope.data.specs[i].label;
					}
				}

      }
    };
  });
