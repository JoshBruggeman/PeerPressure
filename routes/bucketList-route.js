var db = require("../models/bucketlist.js");
// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the bucketitems
  app.get('/api/bucketlist', function(req, res) {

      db.BucketItem.findAll({
          where: {
              UserId: req.user.id,
              isAchieved: false
          }
      }).then(function(usersBucket) {
          res.json(usersBucket);
      });

  });

  app.post("/api/new", function(req, res) {

    db.create({
      title: req.body.title,
      isAchieved: false,
      image: null,
      blogText: null
      }).then(function(results) {
      res.end();
    });
  });
  // DELETE route for deleting posts
  app.delete("/api/delete/:id", function(req, res) {
    db.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.end();
    });
  });
};
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
