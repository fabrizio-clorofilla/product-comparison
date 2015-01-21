'use strict';

// This is the main directive for the Comparison Tool
// The tools accepts a URL parameter for the number of product boxes to render (param 'boxes'),
//   and the category of product (param 'category)')
// The number of boxes to render has to be between 2 and 5,
//   any other value will fall back to the default value (3 boxes)
// The proprity for category is 'URL Param' -> 'attribute of the directive' -> default ('laptops')

angular.module('comparisonToolApp')
	.directive('comparisonTool', function() {
		return {
			templateUrl: '/src/comparisontool/views/comparisontool.html',
			restrict: 'E',
			// Scope of this directive is set to 'true' because we want to be able to render
			// multiple Comparison Tools in the same page
			scope: true,
			controller: function($scope, $element, $attrs, DataService) {

				// This function returns an array of 'i' elements (useful to build ngRepeat loops)
				$scope.range = function(i) {
					return parseInt(i) ? $scope.range(i - 1).concat(parseInt(i)) : [];
				};

				// This function returns the value for the URL param 'name'
				function getURLParameter(name) {
					return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
				}

				// Initializing the scope variable 'data'
				$scope.data = {};

				// Logic behind the priority on boxes to render and category is described on top of this code
				var paramBoxes = parseInt(getURLParameter('boxes'));
				var paramCategory = getURLParameter('category');
				$scope.boxes = (((paramBoxes < 6) && (paramBoxes > 1)) ? paramBoxes : 3) || $attrs.boxes || 3;
				$scope.category = paramCategory || $attrs.category || 'laptops';

				// Retrieving the JSON using the DataService service
				DataService
					.initData()
					.then(function(d) {
						$scope.data.items = d.items[$scope.category];
						$scope.data.specs = d.specs[$scope.category];
					}, function(d) {
						console.log('Failed to Load Data');
					});

			},
			link: function(scope, element, attrs) {

			}
		};
	});