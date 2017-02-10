

var path = require("path");

module.exports = function(app){
  app.get('/', function(req, res) {
    res.render('index.handlebars');
    // res.sendFile(__dirname + '/views/dropzone.html');
  });

// app.get('/profile', function(req,res){
// res.sendFile(__dirname + '/views/dropzone.html');
// })

}
