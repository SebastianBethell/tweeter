"use strict";

$( document ).ready( function(){
  $( ".textareatweet" ).keyup(function() {
  console.log( 140 - ($(this).val().length) );
});

});