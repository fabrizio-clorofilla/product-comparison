'use strict';

describe('Service: dataservice', function () {

  // load the service's module
  beforeEach(module('comparisonToolApp'));

  // instantiate service
  var data;
  beforeEach(inject(function (_data_) {
    data = _data_;
  }));

  it('should do something', function () {
    expect(!!data).toBe(true);
  });

});
