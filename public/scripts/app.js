/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

/**
 * dateFinder takes in the milliseconds since 1970 and converts it to a mm/dd/yyyy date
 */
  function dateFinder(input){
    var today = new Date(input);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  };

  /**
   * [createTweetElement]  takes in tweet data, creates a new atricle with the new data inside, returns the newTweet
   * @param  {[object]} tweetData - all the data for one tweet
   * @return {[object]} [returns an <article> of a tweet]
   */
  function createTweetElement(tweetData){
    const newTweet = $('<article>').append($('<header>'));
      newTweet.addClass('tweet');

    const header = newTweet.children("header");
     header.addClass("header-org");
     header.append(`<img class="user-icon" src="${tweetData.user.avatars.small}">`);
     header.append(`<h1 class="user-name">${tweetData.user.name}</h1>`);
     header.append(`<div class="user-id">${tweetData.user.handle}</div>`);
     header.append(`<div class="clear"></div>`);

     const tweetText = newTweet.append($('<div>')).children('div');
     tweetText.addClass("tweet-text");
     tweetText.text(tweetData.content.text);

    const footer = newTweet.append($('<footer>')).children('footer');
      footer.addClass("footer-org");
      footer.text(dateFinder(tweetData.created_at));

    const divImg = footer.append($('<div>')).children("div");
      divImg.addClass("social-icons");
      divImg.append(`<i class="fa fa-heart"></i>`);
      divImg.append(`<i class="fa fa-retweet"></i>`);
      divImg.append(`<i class="fa fa-flag"></i>`);

    return newTweet;
  }

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and prepends it to the tweets container
  function renderTweets(data) {
    if (Array.isArray(data)) {
      data.forEach(function(tweetData){
        const tempTweet = createTweetElement(tweetData);
        $('.tweet-database').prepend(tempTweet);
      });
    } else {
      const tempTweet = createTweetElement(data);
      $('.tweet-database').prepend(tempTweet);
    }
  }

/**
 * [handleNewTweet takes the text in the form and the current time when the form is submitted and uses renderTweets to add the tweet to our list]
 * @param   event [the event is submition of the form]
 * @return {[nothing]}       [instead of returning anything handleNewTweet uses renderTweets to add a new tweet to our list]
 */
  function handleNewTweet(trigger) {
    event.preventDefault();

    const $form = $(this);

    //validation that the user didn't leave a blank text box AND that they didn't go OVER the character limit
    if ($form.find('.textarea').val() === '' || $form.find('.textarea').val() === null) {
      alert('Text form cannot be empty!  Please typing your Tweet before hitting submit!');
      return;
    };
    if ($form.find('.textarea').val().length > 140) {
      alert('You are limited to 140 characters per tweet.  Please reduce your tweet to that length or lower before hitting submit!');
      return;
    }

   //serializes the text inputted on the form then adds that and the current time to the newTweetdata array which then gets run through renderTweets
    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: $form.serialize()
    } )
      .then(function() {
        loadTweets()
      })
  }

//when the compose button is pressed slide toggles the whole new-tweet box visable/invisable.
//on visable: focus the text box so the user can just start typing
  $( '.composeTweetButton' ).click(function() {
    $( '.new-tweet' ).slideToggle("slow", function() {
      $( '.textareatweet' ).focus();
     });
  });

/**
 * does a .get request to /tweets/ and on success does the callback function which call renderTweets on the input
 */
  function loadTweets(){
    $.ajax({
      url: "/tweets/",
      method: "GET",
      success: function(tweetsFromDb){
       renderTweets(tweetsFromDb);
       $('input[type="text"], textarea').val('');
        }
    })
  }
//calls loadTweets
loadTweets();

//gets called when someone trys to submit on the tweetform
  $( ".tweetForm" ).submit(handleNewTweet);
});