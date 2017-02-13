// var db = require("../models/bucketlist.js");
// Routes
// =============================================================
// module.exports = function(app) {
  // GET route for getting all of the bucketitems
//   app.get('/profile', function(req, res) {
//
//       db.BucketItem.findAll({
//         where: {
//           id: req.params.id
//         }
//       }).then(function(usersBucket) {
//         console.log(usersBucket);
//     res.render("poststream", usersBucket);
//       });
//   });
// }

//
//   app.get("/api/posts", function(req, res) {
//     var query = {};
//     if (req.query.author_id) {
//       query.AuthorId = req.query.author_id;
//     }
//     // Here we add an "include" property to our options in our findAll query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, just db.Author
//     db.Post.findAll({
//       where: query,
//       include: [db.Author]
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });
//
//   app.get("/api/authors/:id", function(req, res) {
//    // Find one Author with the id in req.params.id and return them to the user with res.json
//   db.Author.findOne({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbAuthor) {
//     res.json(dbAuthor);
//   });
// });







//
//
//
//
//
//   app.put("/api/posts", function(req, res) {
//   db.Post.update(req.body,
//     {
//       where: {
//         id: req.body.id
//       }
//     })
//   .then(function(dbPost) {
//     res.json(dbPost);
//   });
// });
//

  // app.post("/api/new", function(req, res) {
//
//     db.create({
//       title: req.body.title,
//       isAchieved: false,
//       image: null,
//       blogText: null
//       }).then(function(results) {
//       res.end();
//     });
//   });
//   // DELETE route for deleting posts
//   app.delete("/api/delete/:id", function(req, res) {
//     db.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(results) {
//       res.end();
//     });
//   });
// };
//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });
// };
