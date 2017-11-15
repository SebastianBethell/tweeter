/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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



function createTweetElement(tweetData){

//console.log(tweetData.user.name);  DEBUGGING
  var newTweet = $('<article>').append($('<header>'));
    newTweet.addClass('tweet');

  var header = newTweet.children("header");
   header.addClass("header-org");
   header.append(`<img class="user-icon" src="${tweetData.user.avatars.small}" alt="bill murray">`);
   header.append(`<h1 class="user-name">${tweetData.user.name}</h1>`);
   header.append(`<div class="user-id">${tweetData.user.handle}</div>`);
   header.append(`<div class="clear"></div>`);
//console.log(header);
   var tweetText = newTweet.append($('<div>')).children('div');
   tweetText.addClass("tweet-text");
   tweetText.text(tweetData.content.text);

  var footer = newTweet.append($('<footer>')).children('footer');
    footer.addClass("footer-org");
    footer.text(dateFinder(tweetData.created_at));


  const divImg = footer.append($('<div>')).children("div");
    divImg.addClass("social-icons");
    divImg.append(`<i class="fa fa-heart"></i>`);
    divImg.append(`<i class="fa fa-retweet"></i>`);
    divImg.append(`<i class="fa fa-flag"></i>`);

//console.log(newTweet);

return newTweet;
}



function renderTweets(data) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  $( document ).ready( function(){
    data.forEach(function(tweetData){
    var tempTweet = createTweetElement(tweetData);
    console.log($('.tweet-database'));
    $('.tweet-database').append(tempTweet);
    });
  });
}


renderTweets(data);

// $( document ).ready( function(){
//   var newTweet = createTweetElement(tweetData);
//   $('.tweet-database').append(newTweet);
// });