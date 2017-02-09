// var keys = require('../config/aws_config');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/aws_config.json');

var s3 = new AWS.S3();

var bucketParams = {Bucket: 'myBucket'};
s3.createBucket(bucketParams)

var s3Bucket = new AWS.S3( { params: {Bucket: 'myBucket'} } )

var data = {Key: imageName, Body: imageFile};

s3Bucket.putObject(data, function(err, data){
  if (err)
    { console.log('Error uploading data: ', data);
    } else {
      console.log('succesfully uploaded the image!';
    }
});
