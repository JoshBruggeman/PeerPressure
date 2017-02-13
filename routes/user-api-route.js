module.exports = function(app, passport) {
	// load up the user model
    var db = require('../models')
    var User = db.User;

// normal routes ===============================================================
	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.handlebars');
	});

	// app.get('/poststream', isLoggedIn, function(req, res) {

	// 	db.BucketItem.findAll({
	// 				where: {
	// 						UserId: req.user.id,
	// 						isAchieved: true
	// 				}
	// 		}).then(function(usersBucket) {
	// 			console.log("==printing============");
	// 				console.log(usersBucket);
	// 				res.render('poststream.handlebars', usersBucket);
	// 		});
	//
	// });

app.get('/poststream', isLoggedIn, function(req, res){
	var query = {};

  if(req.query.id){
    query.id = req.query.id;
  }
	db.BucketItem.findAll({
		where : query,
		include : [User]
	}).then(function(allbucket){
		console.log(allbucket);
		return res.render('poststream', {bucketitems : allbucket});
	})
})

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


app.get('/bucketlist', isLoggedIn, function(req, res){
	var query = {};
  if(req.query.id){
    query.id = req.query.id;
  }
	db.BucketItem.findAll({
		where : query,
		include : [User]
	}).then(function(allbucket){
		console.log(allbucket);
		return res.render('bucketlist', {bucketitems : allbucket});
	})
})


app.get('/update', isLoggedIn, function(req, res){
	var query = {};
  if(req.query.id){
    query.id = req.query.id;
  }
	db.BucketItem.findAll({
		where : query,
		include : [User]
	}).then(function(allbucket){
		console.log(allbucket);
		return res.render('update', {bucketitems : allbucket});
	})
})

app.post('/bucketlist', function(req, res){
  db.BucketItem.create({
    bucketObj :{
      title : req.body.title,
      isAchieved : false,
      image : null,
      blogText : null,
			UserId : req.user.id
    }

  }).then(function(bucketObj){
console.log(bucketObj);
    res.redirect('/bucketlist');
  })
})


		app.get('/login', function(req, res) {
			res.render('login.handlebars', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/poststream', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.handlebars', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/poststream', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
		req.flash("Error")

	res.redirect('/');
}


//
