// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var flash    = require('connect-flash');
var exphbs = require("express-handlebars");

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var fileUpload = require('express-fileupload');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
//var db = require("./models");


require('./config/passport')(passport); // pass passport for configuration
const awsUploader = require('./services/aws-bucket.js')
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars"); // set up ejs for templating
app.use(express.static(__dirname + '/public'));
// required for passport
app.use(session({ secret: 'anything' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
 app.use(express.static("./public"));
app.post('/upload', function(req, res) {
  var sampleFile;

  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
   console.log('req.fie', req.files)
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
var fileTempPath = __dirname + '/public/picsandstuff/' +  req.files.file.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(fileTempPath, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      var user = {id: 123, name: "Bob" }
      var awsFileName = "user_" + user.id + "/"+ new Date().getTime() + req.files.file.name;
      awsUploader({filePath:fileTempPath, name: req.files.file.name, fileNameInS3: awsFileName, user:user }, res);
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
 // require("./routes/html-route.js")(app);
	app.get('/', function(req, res) {
		// res.render('index.handlebars');
		res.sendFile(__dirname + '/views/dropzone.html')
	});
require('./routes/user-api-route.js')(app, passport); // load our routes and pass in our app and fully configured passport
 // require("./routes/poststream-api-route.js")(app);
 // require("./routes/bucketlist-api-route.js")(app);

// Syncing our sequelize models and then starting our express app

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
