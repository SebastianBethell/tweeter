/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {

/**
 * dateFinder takes in the milliseconds since 1970 and converts it to a mm/dd/yyyy date
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
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
     header.append(`<img class="user-icon" src="${tweetData.user.avatars.small}" alt="bill murray">`);
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
    data.forEach(function(tweetData){
      const tempTweet = createTweetElement(tweetData);
      $('.tweet-database').prepend(tempTweet);
    });
  }

/**
 * [handleNewTweet takes the text in the form and the current time when the form is submitted and uses renderTweets to add the tweet to our list]
 * @param   event [the event is submition of the form]
 * @return {[nothing]}       [instead of returning anything handleNewTweet uses renderTweets to add a new tweet to our list]
 */
  function handleNewTweet(event) {
    event.preventDefault();

    let newTweetData = [
      {
        "user": {
          "name": "Sebastian",
          "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
          },
          "handle": "@Seabass"
        },
        "content": {
          "text": "placeholdertext"
        },
        "created_at": 1461116232227
      }
    ];
    const $form = $(this);

   //serializes the text inputted on the form then adds that and the current time to the newTweetdata array which then gets run through renderTweets
    $.post( "/tweets/", $form.serialize())
      .done(() => {
        const tweet = $form.find('.textarea').val();
        newTweetData[0].content.text = tweet;
        const currentTime = Date.now();
        newTweetData[0].created_at = currentTime;
        renderTweets(newTweetData);
        $('input[type="text"], textarea').val('');
    })

  }

/**
 * does a .ajax get request to /tweets/ and on success renders those tweets
 * @return {[type]} [description]
 */
  function loadTweets(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (tweetsFromDb) {
        renderTweets(tweetsFromDb);
      }
    });
  }
//testing loadTweets
loadTweets();

//gets called when someone trys to submit on the tweetform
  $( ".tweetForm" ).submit(handleNewTweet);
});