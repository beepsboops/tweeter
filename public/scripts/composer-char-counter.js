// $(document).ready(function() {

//   console.log("composer!")
//   // Test to see if index is linked up to this
//   // document.addEventListener("click", () => {
//   //   alert("You clicked somewhere");
//   // });
//   // Yup, works!
  
//   // Figure out which element in index.html that we want to target
//   // Something here: <textarea name="text" id="tweet-text"></textarea>
//   // Let's choose a method/selector that targets the ID

//   const tweetForm = document.getElementById("tweet-text");

//   // Let's check to make sure we're grabbing the right data
//   console.log(tweetForm)
//   // Yup, got it

//   // Add an event listener on the form element (submit)
//   tweetForm.addEventListener('submit', (event) => {

//     // Prevent page reload
//     event.preventDefault();

//     console.log("submitting the form")
//   });


// });

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