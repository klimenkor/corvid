/*
Process images classified as faces
- Search collection for the face 
- Alert if needed
*/

let tableNames = require('./settings.js');
let AWS = require('aws-sdk');
let s3 = new AWS.S3();
let rekognition = new AWS.Rekognition();
let docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
AWS.config.update({region: 'us-east-1'});
const s3url = 'https://s3.amazonaws.com/';
const faceBucket = 'ikncu-faces';

console.log(tableNames.getName('UserDynamoDbARN'));

exports.handler = function (event, context, callback) {
    const item = event.Records[0].s3;
    const bucket = item.bucket.name;
    const key = item.object.key;
    const pair = key.split('/');
    const userId = pair[0];
    const imageId = pair[1];


    console.log('...new face:' + bucket + ' / ' + key);
    s3.getObject(
        {
            Bucket: bucket, 
            Key: key
        }, 
        (err, data) => {
            if (err) {
                console.log(err, err.stack); 
                callback(null,null);
                return;
            }
            
            // search Face

            const collectionId = "ikncu-" + userId;
            let param = { 
                collectionId: collectionId,
                FaceMatchThreshold: 95,
                Image: {
                    'S3Object': {
                        'Bucket': bucket,
                        'Name': key
                    }
                }
            };

            rekognition.searchFacesByImage(param, 
                (err,data) => {
                    if (err) {
                        console.log(err, err.stack); 
                        callback(null,null);
                        return;
                    }
                    console.log(data);
                    callback(null,data);
                });
        });       
};