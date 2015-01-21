'use strict';

angular.module('comparisonToolApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/src/common/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });