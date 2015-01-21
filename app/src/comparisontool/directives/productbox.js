'use strict';

// This is the main directive for the Comparison Tool

angular.module('comparisonToolApp')
  .directive('productBox', function(DataService) {
    return {
      templateUrl: '/src/comparisontool/views/productbox.html',
      restrict: 'E',
      // Scope of this directive is set to 'true' because we want this directive to
      // work in an isolate scope
      scope: true,
      replace: true,
      link: function($scope, $element, $attrs) {

        DataService.registerProductBox($scope.id);
        // This function watches changes to accur to $scope.selectItem
        // (its value changes when the user makes a selection from the dropdown
        // (on both mobile and desktop version or when the user clicks the arrows before and
        // after the title in the mobile version)
        $scope.$watch('selectedItem', function(newVal, oldVal) {
          if (newVal != oldVal || newVal != undefined || newVal != null) {
            // Setting 'isInUse' to true to the product selected in the dropdown
            // Setting 'isInUse' to false to the product that's been swapped for the current selection
            isInUseFnc(newVal, oldVal);
            // Registering the new value in the DataService
            DataService.registerProductBox($scope.id, newVal);
            // Setting the active tab to the current product
            $scope.setActiveTab('this');
          }
        }, true);

        // This function is called by the click even on arrows apprearing
        // before and after the title in the mobile version
        // 'direction' parameter accepts value 'next' and 'prev'
        // The function skips products already selected on the other tabs,
        // and does not do anything when the current element
        // is the last or the first (or when no other products are selectable
        // before or after the current product)
        $scope.selectProduct = function(direction) {

          var items = $scope.data.items;

          // Loops goes forward until the current selectedItem is found on the item Array
          // When it happens, the loop branches into another loop until it finds a product
          // which is not selected on ther tabs. If a selectable product is found,
          // this product is assigned to $scope.selectedItem and it will trigger the watch function
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
          // Loops goes backwards until the current selectedItem is found on the item Array
          // When it happens, the loop branches into another loop going backwards until it
          // finds a product which is not selected on ther tabs
          // If a selectable product is found, this product is assigned to $scope.selectedItem
          // and it will trigger the watch function
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

        // This function is used by the select button (mobile version) to open the relative dropdown
        $scope.openDropdown = function() {
          open($element.find('select'));
        }

        // This function sets the Active tab for the mobile version in order to show/hide the tabs
        // and highlight the select button of the shown tab
        $scope.setActiveTab = function(direction) {
          var boxSelector = '.comparison-product-box-specs';
          // Setting the class to 'show' for the current product-box and 'hide' for the others
          // Setting the class to 'active' for the current product-box and 'inactive' for the others
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

        // The ngRepeat inside the view uses this function to lookup the specification value
        // inside the 'specs' Array. I used the approach to not have the full name of each spec property
        // inside the product in the JSON, while those string are in the item Array inside the JSON
        // This way the Javascript uses id only and the actual lookup is done only at UI level.
        $scope.getSpecName = function(id) {
          for (var i = 0; i < $scope.data.specs.length; i++) {
            if ($scope.data.specs[i].id == id) return $scope.data.specs[i].label;
          }
        }

        // This function sets the swipe events for the 
        var setSwipeEvents = function(productSelected) {
          if (productSelected) {
            // Removing the swipe capabilities from the whole element
            $element.find('.comparison-product-box-specs').swipe("destroy");
            // Attaching the swipe event for the specifications table
            $element.find('.comparison-product-box-specs tbody').swipe({
              swipe: function(event, direction, distance, duration, fingerCount) {
                if (direction == 'left' && $element.next().length > 0) $scope.setActiveTab('next');
                else if (direction == 'right' && $element.prev().length > 0) $scope.setActiveTab('prev');
              },
              allowPageScroll: 'vertical'
            });
          } else {
            // Attaching the swipe event to the whole specs div to allow swiping when product is not selected
            $element.find('.comparison-product-box-specs').swipe({
              swipe: function(event, direction, distance, duration, fingerCount) {
                if (direction == 'left' && $element.next().length > 0) $scope.setActiveTab('next');
                else if (direction == 'right' && $element.prev().length > 0) $scope.setActiveTab('prev');
              }
            });
          }
        }

        // This function sets a boolean property 'isInUse' to 'true' for selected producs, 'false' to free ones
        var isInUseFnc = function(newVal, oldVal) {
          var items = $scope.data.items;

          if (newVal == null) {
            // The product previously selected has been cleared and now there's no product to display
            for (var i = 0; i < items.length; i++) {
              if (items[i].id == oldVal.id) items[i].isInUse = false;
            }
            // Attaching swipe features to the whole specs div
            setSwipeEvents(false);
          }
          if (oldVal == null) {
            // There was no product selected and the user has just selected one
            for (var i = 0; i < items.length; i++) {
              if (items[i].id == newVal.id) items[i].isInUse = true;
            }
            // Attaching swipe
            setSwipeEvents(true);
          }
          if (oldVal != null && newVal != null) {
            // Product has been swapped for another one
            // no need to apply/change/destroy any swipe features
            if (oldVal.id != newVal.id) {
              for (var i = 0; i < items.length; i++) {
                if (items[i].id == newVal.id) items[i].isInUse = true;
                if (items[i].id == oldVal.id) items[i].isInUse = false;
              }
            }
          }
        }

        // Function to open dropdown programmatically
        var open = function(elem) {
          if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem[0].dispatchEvent(e);
          } else if (element.fireEvent) {
            elem[0].fireEvent("onmousedown");
          }
        }

        // Appending the 'select' button (mobile version) to the 'ul' tag above the product-box
        // and binding its click event to the dropdown
        var btnTag = $('<li>SELECT</li>');
        $(btnTag).click(function() {
          $scope.openDropdown();
        });
        $(btnTag).appendTo($element.parent().prev());

        // Attaching swipe capabilities to the message div (mobile version)
        setSwipeEvents(false)

      }

    };
  });