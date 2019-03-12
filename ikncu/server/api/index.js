'use strict';
let AWS = require('aws-sdk');
let tableNames = require('./settings.js');
var documentClient = new AWS.DynamoDB.DocumentClient();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = (event, context, callback) => {
    const operation = event.operation;
    const table = tableNames.getName(event.table);
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
            documentClient.query(event.payload, callback);
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};
