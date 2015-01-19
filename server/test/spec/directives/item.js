'use strict';

describe('Directive: item/item', function () {

  // load the directive's module
  beforeEach(module('serverApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<item></item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the item/item directive');
  }));
});
