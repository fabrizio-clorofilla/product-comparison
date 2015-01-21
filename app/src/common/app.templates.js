angular.module('comparisonToolApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/src/common/views/main.html',
    "<data-comparison-tool data-boxes=3 data-category=laptops></data-comparison-tool>"
  );


  $templateCache.put('/src/comparisontool/views/comparisontool.html',
    "<div class=comparison-container><h1>Compare Product</h1><ul class=comparison-select-button></ul><ul><data-product-box ng-repeat=\"box in range(boxes)\"></data-product-box></ul><h3 class=comparison-results>Results</h3></div>"
  );


  $templateCache.put('/src/comparisontool/views/productbox.html',
    "<li class=comparison-product-box><div class=comparison-product-box-dropdown><select ng-model=selectedItem ng-options=\"item.name for item in data.items\" data-options-disabled=\"item.isInUse for item in data.items\"><option value=\"\">Select an item</option></select></div><div class=comparison-product-box-spacer></div><div class=comparison-product-box-specs ng-swipe-right=\"setActiveTab('prev')\" ng-swipe-left=\"setActiveTab('next')\"><table ng-if=selectedItem><thead><tr><th class=comparison-product-title><span class=arrow ng-click=\"selectProduct('prev')\">&lt;</span><span class=title>{{selectedItem.name}}</span><span class=arrow ng-click=\"selectProduct('next')\">&gt;</span></th></tr></thead><tbody><tr ng-repeat=\"(key, value) in selectedItem.specs\"><td><p><strong>{{getSpecName(key)}}</strong></p><p>{{value}}</p></td></tr></tbody></table><div ng-if=!selectedItem class=comparison-product-box-message ng-click=openDropdown()>Select a product to start compairing</div></div></li>"
  );

}]);
