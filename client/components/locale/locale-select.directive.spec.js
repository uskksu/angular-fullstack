'use strict';

describe('Directive: localeSelect', function () {

  // load the directive's module
  beforeEach(module('angularFullstackApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<locale-select></locale-select>');
    element = $compile(element)(scope);
    //expect(element[0].tagName).toBe('SELECT');
  }));
});
