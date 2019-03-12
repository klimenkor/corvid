const keys = require('./settings.js');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.get = (event, context, callback) => {
    console.log('Inside get function');
    console.log(event);
    const type = event.type;
    console.log(type);
    
    const params = {
        TableName: keys.getName('UserDynamoDbARN'),
        Key: {
            "Id": event.Id
        }
    };
    dynamodb.getItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            callback(err);
        } else {
            console.log("Success", data);
            callback(null, data);
        }
    });
}

exports.post = (event, context, callback) => {
    console.log('Inside post function');
    const params = {
        TableName: keys.getName('UserDynamoDbARN'),
        Item: {
            "Id": {
                S: "user_" + Math.random()
            },
            "TierId": {
                S: "1"
            },
            "Name": {
                S: "Roman Klimenko"
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

