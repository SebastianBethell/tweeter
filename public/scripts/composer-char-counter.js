"use strict";

$( document ).ready( function(){
  $( ".textareatweet" ).keyup(function() {
  // console.log( 140 - ($(this).val().length) );
  // console.log($(this).closest("form").find("span").text());
  $(this).closest("form").find("span").text(140 - ($(this).val().length));
});

});