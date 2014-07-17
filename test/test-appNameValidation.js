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
      '+000101',
      '!foobar',
      '000000000000000000000000000000000000000000000',
      'drupal'
    ];
  });

  it('returns true for valid names', function () {
    var foundInvalid = false;
    validNames.forEach(function (name) {
      if (!appNameValidation(name)) {
        foundInvalid = true;
        return;
      }
    });

    assert.ok(!foundInvalid, 'All the names were valid');
  });

  it('returns false for invalid names', function () {
    var foundValid = false;
    invalidNames.forEach(function (name) {
      if (appNameValidation(name)) {
        foundValid = true;
        return;
      }
    });

    assert.ok(!foundValid, 'All the names were invalid');

  });
});
