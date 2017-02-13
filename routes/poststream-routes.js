module.exports = function(app) {
    var db = require('../models');

    // // show the stream page
  	// app.get('/stream', function(req, res) {
  	// 	res.render('poststream.handlebars');
  	// });

    // //find the current logged in user's uploaded pictures of achieved items
    // app.get('/profile', function(req, res) {
    //
    //     db.BucketItem.findAll({
    //         where: {
    //             UserId: req.user.id,
    //             isAchieved: true
    //         }
    //     }).then(function(usersBucket) {
    //         console.log(usersBucket);
    //         res.json(usersBucket);
    //     });
    //
    // });
    //add a new bucket list item
    // app.post('/bucketlist', function(req, res){
    // 		db.BucketItem.create({title : req.body.title, isAchieved : false, image: null,blogText : null})
    // 		.then(function(){
    // 			res.redirect('/bucketlist');
    // 		});
    // });





};
