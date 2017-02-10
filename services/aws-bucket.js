var s3 = require('s3');
require('dotenv').load();

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
// const filesToUpload = [
//     {
//         filePath: "/files/noob.jpg",
//         fileNameInS3: "things-and-stuff.jpg"
//     }
// ]


// var fileNames = ['cat.jpg', 'dog.jpg', 'earth.gif', 'stuff.mp4'];
// var user = {
//     id:1
// }

// function assignNames(user, files){
//    return  files.map(function(file, index){
//
//         return "user_" + user.id + "/"+ new Date().getTime() + file;
//
//     })
// }
// console.log(assignNames(user, fileNames));
//
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
      console.log("done uploading");
      res.send(fileInfo.name + " uploaded ! ");
  });


}
