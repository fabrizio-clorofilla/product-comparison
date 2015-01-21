'use strict';

angular.module('comparisonToolApp')
	.directive('comparisonTool', function() {
		return {
			templateUrl: '/src/comparisontool/views/comparisontool.html',
			restrict: 'E',
			scope: true,
			controller: function($scope, $element, $attrs, DataService) {

				$scope.range = function(i) {
					return parseInt(i) ? $scope.range(i - 1).concat(parseInt(i)) : [];
				};

				function getURLParameter(name) {
					return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
				}

				$scope.data = {};
				var paramBoxes = parseInt(getURLParameter('boxes'));
				$scope.boxes = (((paramBoxes < 6) && (paramBoxes > 1)) ? paramBoxes : 3) || $attrs.boxes || 3;

				DataService
					.initData()
					.then(function(d) {
						$scope.data.items = d.items[$attrs.category];
						$scope.data.specs = d.specs[$attrs.category];
					}, function(d) {
						console.log('Failed to Load Data');
					});

			},
			link: function(scope, element, attrs) {
				$('<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">').appendTo('head');
			}
		};
	});