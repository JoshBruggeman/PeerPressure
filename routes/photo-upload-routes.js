
module.exports = function(app){
  var db = require('../models');
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

       db.User.findById(1).then(function(user){
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
}
