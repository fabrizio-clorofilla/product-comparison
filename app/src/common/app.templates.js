angular.module('comparisonToolApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/src/comparisontool/views/comparisontool.html',
    "<div class=comparison-container><h1>Compare Product</h1><ul class=comparison-select-button></ul><ul><data-product-box ng-repeat=\"box in range(boxes)\"></data-product-box></ul><h3 class=comparison-results>Results</h3></div>"
  );


  $templateCache.put('/src/comparisontool/views/productbox.html',
    "<li class=comparison-product-box><div class=comparison-product-box-dropdown><select ng-model=selectedItem ng-options=\"item.name for item in data.items\" data-options-disabled=\"item.isInUse for item in data.items\"><option value=\"\">Select an item</option></select></div><div class=comparison-product-box-spacer></div><div class=comparison-product-box-specs ng-swipe-right=\"setActiveTab('prev')\" ng-swipe-left=\"setActiveTab('next')\"><table ng-if=selectedItem><thead><tr><th class=comparison-product-title><span class=arrow>&lt;</span><span class=title>{{selectedItem.name}}</span><span class=arrow>&gt;</span></th></tr></thead><tbody><tr ng-repeat=\"(key, value) in selectedItem.specs\"><td><p><strong>{{getSpecName(key)}}</strong></p><p>{{value}}</p></td></tr></tbody></table><div ng-if=!selectedItem class=comparison-product-box-message ng-click=openDropdown()>Select a product to start compairing</div></div></li>"
  );


  $templateCache.put('/views/main.html',
    "<data-comparison-tool data-boxes=3 data-category=laptops></data-comparison-tool>"
  );


  $templateCache.put('/./generator-angular-feature/templates/common/root/component/app/views/main.html',
    "<div class=header><ul class=\"nav nav-pills pull-right\"><li class=active><a ng-href=#>Home</a></li><li><a ng-href=#>About</a></li><li><a ng-href=#>Contact</a></li></ul><h3 class=text-muted><%= appname %></h3></div><div class=jumbotron><h1>'Allo, 'Allo!</h1><p class=lead><img src=\"<%= config.images.path %>/yeoman.png\" alt=\"I'm Yeoman\"><br>Always a pleasure scaffolding your apps.</p><p><a class=\"btn btn-lg btn-success\" ng-href=#>Splendid!</a></p></div><div class=\"row marketing\"><h4>HTML5 Boilerplate</h4><p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p><h4>Angular</h4><p>AngularJS is a toolset for building the framework most suited to your application development.</p><h4>Karma</h4><p>Spectacular Test Runner for JavaScript.</p></div><div class=footer><p>♥ from the Yeoman team</p></div>"
  );


  $templateCache.put('/./generator-angular-feature/templates/common/root/feature/app/src/common/views/main.html',
    "<div class=header><ul class=\"nav nav-pills pull-right\"><li class=active><a ng-href=#>Home</a></li><li><a ng-href=#>About</a></li><li><a ng-href=#>Contact</a></li></ul><h3 class=text-muted><%= appname %></h3></div><div class=jumbotron><h1>'Allo, 'Allo!</h1><p class=lead><img src=\"<%= config.images.appPath.replace(/\\{\\{feature\\}\\}/, config.common.path) %>/yeoman.png\" alt=\"I'm Yeoman\"><br>Always a pleasure scaffolding your apps.</p><p><a class=\"btn btn-lg btn-success\" ng-href=#>Splendid!</a></p></div><div class=\"row marketing\"><h4>HTML5 Boilerplate</h4><p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p><h4>Angular</h4><p>AngularJS is a toolset for building the framework most suited to your application development.</p><h4>Karma</h4><p>Spectacular Test Runner for JavaScript.</p></div><div class=footer><p>♥ from the Yeoman team</p></div>"
  );

}]);
