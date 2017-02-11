/* global moment */
// When user clicks add-btn
$("#bucketItem-submit").on("click", function(event) {
  event.preventDefault();
  // Make an object
  var newBucketItem = {
    title: $("#bucketList-box").val().trim()
  };
  console.log(newBucketItem);
  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newBucketItem)
    // On success, run the following code
    .done(function() {
      var row = $("<div>");
      row.addClass("bucketItem");
      // row.addId(newBucketItem.id);
      row.append("<p>" + newBucketItem.title + " posted: </p>");
      $("#bucketItem-area").prepend(row);
    });
  // Empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#bucketList-box").val("");
});
// When the page loads, grab all of our chirps
$.get("/api/bucketlist", function(data) {
  if (data.length !== 0) {
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("bucketItem");
      row.append("<p>" + data[i].bucketItem + " posted.. </p>");
      $("#bucketItem-area").prepend(row);
    }
  }
});


// function handleDeleteButtonPress() {
//   var listItemData = $(this).whateverhere
//   var id = listItemData.id;
//   $.ajax({
//     method: "DELETE",
//     url: "/api/delete/" + id
//   })
//   .done(getBucketItem);
// }
// });
//
// $.delete("/api/delete/:id", function(req, res){
//
// });
