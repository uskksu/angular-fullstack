'use strict';

describe('Service: Scopes', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var Scopes;
  beforeEach(inject(function (_Scopes_) {
    Scopes = _Scopes_;
  }));

  it('should do something', function () {
    expect(!!Scopes).toBe(true);
  });

});
