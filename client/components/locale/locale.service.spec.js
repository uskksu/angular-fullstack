'use strict';

describe('Service: Locale', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var Locale;
  beforeEach(inject(function (_Locale_) {
    Locale = _Locale_;
  }));

  it('should do something', function () {
    expect(!!Locale).toBe(true);
  });

});
