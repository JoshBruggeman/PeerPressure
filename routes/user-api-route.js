module.exports = function(app, passport) {
	// load up the user model
    var db = require('../models')
    var User = db.User;

		var BucketItem = require("../models").BucketItem;


// normal routes ===============================================================
	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.handlebars');
	});

app.get('/poststream', isLoggedIn, function(req, res){
	var query = {};

  if(req.query.id){
    query.id = req.query.id;
  }
	BucketItem.findAll({
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
	BucketItem.findAll({
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
	BucketItem.findAll({
		where : query,
		include : [User]
	}).then(function(allbucket){
		console.log(allbucket);
		return res.render('update', {bucketitems : allbucket});
	})
})

app.post('/bucketlist', function(req, res){
  BucketItem.create({
      title: req.body.title,
			UserId: req.user.id
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


//============================photo upload

const awsUploader = require('../services/aws-bucket.js')
app.post('/upload', function(req, res) {
var sampleFile;

if (!req.files) {
	res.send('No files were uploaded.');
	return;
}
 console.log('req.fie', req.files)
// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
sampleFile = req.files.file;
var fileTempPath = __dirname + '/../public/picsandstuff/' +  req.files.file.name;
// Use the mv() method to place the file somewhere on your server
sampleFile.mv(fileTempPath, function(err) {
	if (err) {
		res.status(500).send(err);
	}
	else {
		 db.User.findById(req.user.id).then(function(user){
			console.log("user", user);
			var awsFileName = "user_" + user.id + "/"+ new Date().getTime() + req.files.file.name;
			awsUploader({filePath:fileTempPath, name: req.files.file.name, fileNameInS3: awsFileName, user:user }, res);
		})
	}
});
});

// Routes =============================================================
app.post('/file-upload',function(req,res){
console.log("from-fileload",req.body.file.name);
fs.readFile(req.files.displayImage.path, function (err, data) {
//   // ...
 var newPath = __dirname + "/uploads/";
 fs.writeFile(newPath, data, function (err) {
			 res.redirect("back");
 });
});
// file code here
})


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
