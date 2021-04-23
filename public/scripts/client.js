/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//////////////
// DATABASE //
//////////////

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


//////////////////
// JQUERY STUFF //
//////////////////

$(document).ready(function () {

// CREATETWEETELEMENT FUNCTION

const createTweetElement = function(tweet) {
  
  let $tweet = `<article class="tweet-container">
      
  <header class="tweet-header">
    <div class="avatar-name">
      <img src="${tweet.user.avatars}">
      <p>${tweet.user.name}</p>
    </div>
    <div class="handle">
      <p>${tweet.user.handle}</p>
    </div>
  </header>

  <section class="tweet-message">
    <p>${tweet.content.text}</p>
  </section>

  <footer class="tweet-footer">
    <div>
      <span class="time-stamp" datetime="${tweet.created_at}"></span>
    </div>
    <div class="tweet-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>

</article>`

  return $tweet;

}

// RENDER TWEETS FUNCTION

const renderTweets = function(tweets) {
  // loops through tweets
  const reversedTweets = tweets.reverse();
  for (let tweetObj of reversedTweets) {
    // calls createTweetElement for each tweet
    let renderedTweet = createTweetElement(tweetObj)
    // takes return value and appends it to the tweets container
    $('#tweet-container').append(renderedTweet);
  }
}

// renderTweets(data);

// FORMERROR FUNCTION

// const animatedError = function() {
//   let error = `Error: Too long`
//   $('#error-container').append(error);
// }
// const animatedError = function() {
//   $( "error-container" ).slideDown( 1000, function() {
//     $( this )
//       .css( "border", "2px red inset" )
//       .filter( ".middle" )
//         .css( "background", "yellow" )
//         .focus();
//   })
// }

const formError = (errorMessage) => {
  return $('#error-container').slideDown("slow").append(`⚠️ Sorry 😭 ${errorMessage} ⚠️`)
}



// HANDLESUBMIT FUNCTION

// Vanilla JS examples
/*
  element.addEventListener(<event-name>, <callback>, <use-capture>);
  
  document.addEventListener("click", () => {
  console.log("You just clicked somewhere on this page.");
*/

// Add event listener for submit event
$('form').on('submit', function(event) {
  
  // Form validation - check if tweets are too short, null, too long
  // Store value of tweet form input
  const tweetFormInput = document.getElementById("tweet-text").value
  
  // Check we're getting the right data
  console.log("Submit Handler: tweetForm:", tweetFormInput)
  console.log("Submit Handler: typeof tweetFormInput:", typeof tweetFormInput)

  // Error if tweet is empty or null
  if (!tweetFormInput.length) {
    formError("Your tweet must be more than 0 characters")
    // $('#error-container').slideDown("slow").append("Sorry, can't submit empty tweet")
    // animatedError()
    // alert( "Sorry, can't submit empty tweet" )
    event.preventDefault();
    // Error if tweet is too long (> 140 chars)
  } else if (tweetFormInput.length > 140) {
    formError("Your tweet must not be more than 140 characters")
    // alert( "Sorry, tweet is too long" )
    event.preventDefault();
  } else {

    // Test that it's working
    // alert( "Handler for .submit() called." );
    // console.log("Submitted")

    // Prevent default submit behaviour (page reload)
    event.preventDefault();
    
    // Serialize form data and sent to server as query string
    const submittedTweet = $(this).serialize()
    
    // Check what's outputted with serialize function
    // console.log("submittedTweet:", submittedTweet)

    // Confirm what type of data
    // console.log("typeof:", typeof submittedTweet)

    // Create a new tweet with the tweetFormInput
    // const newestTweet = document.createElement("text");

    // Use the jQuery library to submit a POST request that sends the serialized data to the server
    $.ajax({
      // Sends data to /tweets, which is routed by server/index.js
      url: "/tweets",
      // Which is "requiring" /server/routs/tweets.js to handle
      method: "POST",
      // Indicate what data we want to it to hanlde
      data: submittedTweet
    })
    // Verify the AJAX request
      .then(res => {
        $('#error-container').empty();
        $('form').trigger("reset");
        $('#tweet-container').empty()
        loadTweets()
        console.log("Submit Handler: Tweet sucessfully sent", res)
      })
      .catch(err => console.log("Submit Handler: An error happened:", err))
  }
})

// LOADTWEETS FUNCTION

console.log("Trace: At loadTweets function")
const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET"
  })
    .then(res => {
      console.log("loadTweets: response content:", res)
      renderTweets(res)
      
      // timeago call needs to be here or else it won't be called in time before renderTweets(res) finishes 
      timeago.render(document.querySelectorAll('.time-stamp'));
    })
    .catch(err => console.log("loadTweets: There was an error getting the data:", err))
    .always(() => console.log("loadTweets: .always message"))
  }

loadTweets()


});