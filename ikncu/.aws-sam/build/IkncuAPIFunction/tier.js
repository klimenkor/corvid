const keys = require('./settings.js');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.post = (event, context, callback) => {
    console.log('Inside post function');
    const params = {
        TableName: keys.getName('TierDynamoDbARN'),
        Item: {
            "Id": {
                S: "user_" + Math.random()
            },
            "Name": {
                S: "Tier xxx"
            }
        }
    };
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            callback(err);
        } else {
            console.log("Success", data);
            callback(null, data);
        }
    });
}
