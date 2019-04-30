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
    if(event.Records === undefined)
    {
        console.log('handler: Malformed event object'); 
        callback(null,null);
        return;
    }

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
                CollectionId: collectionId,
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
                    
                    data.FaceMatches.forEach( face => {
                        console.log(face.Similarity);
                        console.log(face.Face);
                    });
                    // { Width: 0.9188481569290161,
                        // Height: 0.5659894347190857,
                        // Left: 0.12543664872646332,
                        // Top: 0.040605995804071426 },
                        // SearchedFaceConfidence: 99.99998474121094,
                        // FaceMatches: [ { Similarity: 99.64151763916016, Face: [Object] } ],
                        // FaceModelVersion: '4.0' }
                    
                    callback(null,data);
                });
        });       
};