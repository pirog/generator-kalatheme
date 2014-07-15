
(($) ->
  $ ->
    Drupal = window.Drupal || behaviours: { attach: {} }

    Drupal.behaviours.attach = (context) ->
      consoele.log "I have a custom theme"

) jQuery
