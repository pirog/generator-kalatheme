/**
 * @file
 * Theme's JS file
 */
'use strict';

/* global Drupal, jQuery */

(function($) {
  $(function() {
    // Settings and context are available to pass the attach function.
    // @link https://www.drupal.org/node/756722
    Drupal.behaviours.attach = function() {
      console.log('I have an  custom theme');
    };
  });
})(jQuery);
