'use strict';

describe('Service: locale', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var locale;
  beforeEach(inject(function (_locale_) {
    locale = _locale_;
  }));

  it('should do something', function () {
    expect(!!locale).toBe(true);
  });

});
