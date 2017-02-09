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

const filesToUpload = [
    {
        filePath: "/files/noob.jpg",
        fileNameInS3: "things-and-stuff.jpg"
    }, {
        filePath: "/files/panmei.gif",
        fileNameInS3: "hmmm-good-point.gif"
    }, {
        filePath: '/files/richard_feynman.jpg',
        fileNameInS3: "the-man-the-myth-the-legend.jpg"
    },{
      filePath: '/files/tiger.jpg',
      fileNameInS3: "myfile.jpg"
    }

]

var params = {
    localFile: __dirname + filesToUpload[3].filePath,
    s3Params: {
        Bucket: "peerpressure8080",
        Key: filesToUpload[3].fileNameInS3
    }
};
var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
    console.log("done uploading");
});
