var s3 = require('s3');
require('dotenv').load();
const db = require('../models/index.js')

const s3Config = {
    maxAsyncS3: 20, // this is the default
    s3RetryCount: 3, // this is the default
    s3RetryDelay: 1000, // this is the default
    multipartUploadThreshold: 20971520, // this is the default (20 MB)
    multipartUploadSize: 15728640, // this is the default (15 MB)
    s3Options: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_PW,
        region: "us-east-1"
    }
}
var client = s3.createClient(s3Config);
var dbBucket = require("../models/bucketlist.js");
module.exports = function(fileInfo, res){
console.log("FileInfo", fileInfo);
  var params = {

      localFile: fileInfo.filePath,
      s3Params: {
          Bucket: "peerpressure8080",
          Key: fileInfo.fileNameInS3
      }
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
      console.error("unable to upload:", err.stack);
      res.send(fileInfo.name + " Had an error !");
  });
  uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    var imgSrc = 'https://s3.amazonaws.com/peerpressure8080/' +  fileInfo.fileNameInS3;
    // fileInfo.user.setBucketItem( {title: fileInfo.name, isAchieved: true, image: imgSrc}).then(function(stuff){
db.BucketItem.create({UserId: fileInfo.user.id, title: fileInfo.name, isAchieved: true, image: imgSrc }).then(function(){
// db.bucketItem.update
// db.BucketItem.create({UserId: fileInfo.user.id, isAchieved: true, image: imgSrc }).then(function(){
      console.log("done uploading");
      res.send(fileInfo.name + " uploaded ! ");
    })
  });


}
