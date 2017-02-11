/* global moment */

// When user clicks add-btn
$("#bucketItem-submit").on("click", function(event) {
  event.preventDefault();
  // Make a newBucketItem object
  var newBucketItem = {
    title: $("#title").val().trim(),
    isAchieved: false,
    image: null
  };
  console.log(newBucketItem);
  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBucketItem)
    // On success, run the following code
    .done(function() {
      var row = $("<div>");
      row.addClass("bucketItem");
      row.append("<p>" + newBucketItem.title + "</p>");
      $("#bucketItem-area").prepend(row);
    });
  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#bucketList-box").val("");
});
// When the page loads, grab all of the bucketlist items
$.get("/api/all", function(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("bucketItem");
      row.append("<p>" + data[i].bucketItem + "</p>");
      $("#bucketItem-area").prepend(row);
    }
  }
});
