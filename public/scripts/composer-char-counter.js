"use strict";

/**
 * nothing happens until the DOM is ready
 * on keyup in the textarea form the counter text will equal 140 - how many chars typed
 * if less than 0 it will change the text red
 */
$( document ).ready( function(){
  $( ".textareatweet" ).keyup(function() {
    const thisTextArea = $(this).closest("form").find("span");
    const updateCounter = thisTextArea.text(140 - ($(this).val().length));

    if (thisTextArea.text() < 0) {
      thisTextArea.addClass("counterOver");
      updateCounter;
    } else {
      thisTextArea.removeClass("counterOver");
      updateCounter;
    }
  });
});