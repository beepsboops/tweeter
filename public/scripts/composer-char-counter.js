// COMPOSER CHARACTER COUNTER FUNCTION

$(document).ready(function() {
  $( "#tweet-text" ).on('keyup', function() {
    const tweetLength = $( "#tweet-text" ).val().length;
    if (tweetLength > 140) {
      $('output.counter').addClass('warning');
    } else {
      $('output.counter').removeClass('warning');
    }
    ($('.counter').text(140 - tweetLength))
  })
});