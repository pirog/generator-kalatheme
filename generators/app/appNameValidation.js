'use strict';
/**
 * Validate name is Drupal compatible.
 */
module.exports = function (name) {
  var isValid = true;
  // Some obvious not allowed names.
  var notAllowed = [
    'kalatheme',
    'drupal',
    'views'
  ];

  notAllowed.forEach(function (item) {
    if (item === name) {
      isValid = false;
    }
  });

  if (isValid === false) {
    return isValid;
  }

  if (name.length > 32) {
    return false;
  }
  var pattern = /[^a-z0-9_]+/;

  if (pattern.test(name)) {
    return false;
  }

  return isValid;
};
