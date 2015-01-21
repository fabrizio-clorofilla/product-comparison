'use strict';

angular.module('comparisonToolApp')
  .directive('productBox', function() {
    return {
      templateUrl: '/src/comparisontool/views/productbox.html',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function($scope, $element, $attrs) {

        $scope.$watch('selectedItem', function(newVal, oldVal) {
          if (newVal != oldVal || newVal != undefined || newVal != null) {
            // setting 'isInUse' to true to the product selected in the dropdown
            // setting 'isInUse' to false to the product that's been swapped for the current selection
            isInUseFnc(newVal, oldVal);
            // setting the active tab to the current product
            $scope.setActiveTab('this');
          }
        }, true);

        $scope.selectProduct = function(direction) {

          var items = $scope.data.items;

          if(direction == 'next'){
            for (var i = 0; i < items.length - 1; i++) {
              if (items[i].id == $scope.selectedItem.id) {
                for(var j = i + 1; j < items.length; j++) {
                  if(items[j].isInUse != true) {
                    $scope.selectedItem = items[j];
                    break;
                  }
                }
                break;
              }
            }
          }
          if(direction == 'prev'){
            for (var i = items.length - 1; i >= 1; i--) {
              if (items[i].id == $scope.selectedItem.id) {
                for(var j = i - 1; j >= 0; j--) {
                  if(items[j].isInUse != true) {
                    $scope.selectedItem = items[j];
                    break;
                  }
                }
                break;
              }
            }
          }
        }

        $scope.$watch('selectedItem', function(newVal, oldVal) {
          if (newVal != oldVal || newVal != undefined || newVal != null) {
            // setting 'isInUse' to true to the product selected in the dropdown
            // setting 'isInUse' to false to the product that's been swapped for the current selection
            isInUseFnc(newVal, oldVal);
            // setting the active tab to the current product
            $scope.setActiveTab('this');
          }
        }, true);

        // Appending the 'select' button to the 'ul' tag above the product-box and binding its click event
        // to the dropdown
        var btnTag = $('<li>SELECT</li>');
        $(btnTag).click(function() {
          $scope.openDropdown();
        });
        $(btnTag).appendTo($element.parent().prev());

        $scope.openDropdown = function() {
          open($element.find('select'));
        }

        $scope.setActiveTab = function(direction) {
          var boxSelector = '.comparison-product-box-specs';
          // setting the class to 'show' for the current product-box and 'hide' for the others
          // setting the class to 'active' for the current product-box and 'inactive' for the others
          $element.parent().children().find(boxSelector).removeClass('show').addClass('hide');
          $(btnTag).parent().children().removeClass('active').addClass('inactive');

          switch (direction) {
            case 'this':
              $element.find(boxSelector).removeClass('hide').addClass('show');
              $(btnTag).removeClass('inactive').addClass('active');
              break;
            case 'next':
              $element.next().find(boxSelector).removeClass('hide').addClass('show');
              $(btnTag).next().removeClass('inactive').addClass('active');
              break;
            case 'prev':
              $element.prev().find(boxSelector).removeClass('hide').addClass('show');
              $(btnTag).prev().removeClass('inactive').addClass('active');
              break;
          }
        }

        $scope.getSpecName = function(id) {
          for (var i = 0; i < $scope.data.specs.length; i++) {
            if ($scope.data.specs[i].id == id) return $scope.data.specs[i].label;
          }
        }

        var setSwipeEvents = function(productSelected) {
          if (productSelected) {
            // removing the swipe capabilities from the whole element
            $element.find('.comparison-product-box-specs').swipe("destroy");
            // setting the swipe event for the product title
            $element.find('.comparison-product-box-specs thead').swipe({
              swipe:function(event, direction, distance, duration, fingerCount) {
              switch (direction) {
                case 'left': $scope.selectProduct('next'); break;
                case 'right': $scope.selectProduct('prev'); break;
              }
            },allowPageScroll:'vertical'});
            // setting the swipe event for the specification table
            $element.find('.comparison-product-box-specs tbody').swipe({
              swipe: function(event, direction, distance, duration, fingerCount) {
                if (direction == 'left' && $element.next().length > 0) $scope.setActiveTab('next');
                else if (direction == 'right' && $element.prev().length > 0) $scope.setActiveTab('prev');
              },
              allowPageScroll: 'vertical'
            });
          } else {
            $element.find('.comparison-product-box-specs').swipe({
              swipe: function(event, direction, distance, duration, fingerCount) {
                if (direction == 'left' && $element.next().length > 0) $scope.setActiveTab('next');
                else if (direction == 'right' && $element.prev().length > 0) $scope.setActiveTab('prev');
              }
            });
          }
        }

        var isInUseFnc = function(newVal, oldVal) {
          var items = $scope.data.items;
          // setting 'isInUse' to true to the product selected in the dropdown
          // setting 'isInUse' to false to the product that's been swapped for the current selection
          if (newVal == null) {
            for (var i = 0; i < items.length; i++) {
              if (items[i].id == oldVal.id) items[i].isInUse = false;
            }
            setSwipeEvents(false);
          }
          if (oldVal == null) {
            for (var i = 0; i < items.length; i++) {
              if (items[i].id == newVal.id) items[i].isInUse = true;
            }
            setSwipeEvents(true);
          }
          if (oldVal != null && newVal != null) {
            if (oldVal.id != newVal.id) {
              for (var i = 0; i < items.length; i++) {
                if (items[i].id == newVal.id) items[i].isInUse = true;
                if (items[i].id == oldVal.id) items[i].isInUse = false;
              }
            }
          }
        }

        var open = function(elem) {
          if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem[0].dispatchEvent(e);
          } else if (element.fireEvent) {
            elem[0].fireEvent("onmousedown");
          }
        }

        // setting the swipe event for the message div
        setSwipeEvents(false)

      }

    };
  });