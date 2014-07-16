/*global describe, beforeEach, it */
'use strict';

var appNameValidation = require('../generators/app/appNameValidation'),
assert = require('assert'),
validNames,
invalidNames;

describe('machine name validation', function () {

  beforeEach(function () {
    validNames = [
      'my_awesome_theme',
      'nooooob',
      'hfhfhdhs',
      'greenbell',
      'my_theme'
    ];
    invalidNames = [
      'kalatheme',
      'MY-Awesome-Theme',
      '000101',
      '_foobar',
      '_',
      'drupal'
    ];
  });

  it('returns true for valid names', function () {

    validNames.forEach(function (name) {
      assert(appNameValidation(name)).equal(true);
    });

  });

  it('returns false for invalid names', function () {

    invalidNames.forEach(function (name) {
      assert(appNameValidation(name)).equal(false);
    });

  });
});
