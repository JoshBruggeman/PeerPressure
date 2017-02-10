

var path = require("path");

module.exports = function(app){
  // cms route loads cms.html
app.get("/cms", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public/cms.html"));
});
}
