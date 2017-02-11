
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  app.get("/api/all", function(req, res) {
    var query = {};
    // if (req.query.author_id) {
    //   query.AuthorId = req.query.author_id;
    // }
    // 1. Add a join here to include all of the Authors to these posts
    dbBucket.findAll({}).then(function(results) {
      res.json(results);
    });
  });
  // Get rotue for retrieving a single post
  // app.get("/api/bucketList", function(req, res) {
  //   // 2. Add a join here to include the Author who wrote the Post
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     console.log(dbPost);
  //     res.json(dbPost);
  //   });
  // });
  // POST route for saving a new post
  app.post("/api/new", function(req, res) {

    console.log('BucketList Data:');
    console.log(req.body);

    dbBucket.create({
      title: req.body.title,
      isAchieved: req.body.isAchieved
      }).then(function(results) {
      res.end();
    });
  });
}
  // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });
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
