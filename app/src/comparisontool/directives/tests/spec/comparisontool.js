'use strict';

describe('Directive: comparisontool/comparisontool', function () {

  // load the directive's module
  beforeEach(module('comparisonToolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<comparisontool></comparisontool>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the comparisontool/comparisontool directive');
  }));
});
