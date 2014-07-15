/**
 * @file <%= file.name %>
 *
 */
'use strict';
(function($) {
  $(function() {
    var Drupal = window.Drupal || { behaviours:{ attach: {}} };
    Drupal.behaviours.attach = function(context) {
      consoele.log('I have an  custom theme')
    };
  });
})(jQuery);
