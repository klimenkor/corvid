'use strict';
let AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient();

function getArn(name) {
    let arns = new Map(
    [
        [
            "MotionDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-MotionTable-VOUWTWLMBN5T"
        ],
        [
            "TierDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-TierTable-1JHBOG2S1QMXD"
        ],
        [
            "CategoryDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-CategoryTable-178EDJW7OEMT4"
        ],
        [
            "CameraDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-CameraTable-GZ4SHXIGI18E"
        ],
        [
            "FaceDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-FaceTable-1LAU3G4XLFXFZ"
        ],
        [
            "UserDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-UserTable-DBK49LM4E1H9"
        ]
    ]
    );
    return arns.get(name);
}

function getName(name) {
    return getArn(name).split('/')[1];
}

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = (event, context, callback) => {
    const operation = event.operation;
    const table = getName(event.table);
    event.tableName = table;
    event.payload.TableName = event.tableName;
    console.log(event);
    switch (operation) {
        case 'create':
            documentClient.put(event.payload, callback);
            break;
        case 'read':
            documentClient.get(event.payload, callback);
            break;
        case 'update':
            documentClient.update(event.payload, callback);
            break;
        case 'delete':
            documentClient.delete(event.payload, callback);
            break;
        case 'list':
            documentClient.scan(event.payload, callback);
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};
