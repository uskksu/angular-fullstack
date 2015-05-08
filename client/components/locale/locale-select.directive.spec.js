'use strict';

describe('Service: localeSelect', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var localeSelect;
  beforeEach(inject(function (_localeSelect_) {
    localeSelect = _localeSelect_;
  }));

  it('should do something', function () {
    expect(!!localeSelect).toBe(true);
  });

});
