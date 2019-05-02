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

console.log(tableNames.getName('UserDynamoDbARN'));

function updateMotion(id, people) {
  var params = {
    TableName: tableNames.getName('MotionDynamoDbARN'),
    Key:{
      "Id": id
    },
    UpdateExpression: "set People = :a",
    ExpressionAttributeValues:{
      ":a": people.map( x => { return { FaceId: x.Face.FaceId, Similarity: x.Similarity }; })
    },
    ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating motion ID = " + id);
  docClient.update(params, 
    (err, data) => {
      if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Updated:", JSON.stringify(data, null, 2));
      }
    });
}

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
    const motionId = pair[1];


    console.log('...new face: ' + bucket + ' / ' + key);
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
            console.log('...looking for the match - https://s3.amazonaws.com/' + bucket + '/' + key);
            console.log('...in collection - ' + collectionId);
            
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
                    
                    console.log('...found ' + data.FaceMatches.length + ' matches');
                    
                    if(data.FaceMatches.length>0) {

                      updateMotion(motionId, data.FaceMatches);

                      data.FaceMatches.forEach( face => {
                        console.log(face.Similarity);
                        console.log(face.Face);
                      });
                    
                    }    
                    callback(null,null);
                });
        });       
};