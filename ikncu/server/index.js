'use strict';
let AWS = require('aws-sdk');
let tableNames = require('./settings.js');
var documentClient = new AWS.DynamoDB.DocumentClient();
let rekognition = new AWS.Rekognition();
const faceBucket = 'ikncu-faces';


function initCollection(id, callback) {
    console.log('rekognition.initCollection');

    var params = {
        CollectionId: id
    };
    rekognition.createCollection(params, 
        (err, data) => {
            if (err) 
                callback(err); 
            else 
                console.log(null, data);
         
        });
    return id
}

function addFace(payload, callback) {
    console.log('rekognition.addFace');

    let userId = payload.UserId;
    let frame = payload.Frame;
    let categoryId = payload.CategoryId;
    let name = payload.Name;

    const collectionId = 'ikncu-' + userId;
    initCollection(collectionId, 
        (err) => {
            console.log(err);
            var params = {
                CollectionId: collectionId, 
                DetectionAttributes: [
                ], 
                ExternalImageId: frame.replace('/','_'), 
                Image: {
                    S3Object: {
                        Bucket: faceBucket, 
                        Name: userId + '/' + frame
                    }
                }
            };
            console.log('...indexing face');
            rekognition.indexFaces(params, 
                (err,data) => {
                    if (err) {
                        callback(err);   
                        return;
                    }
                    console.log(data.FaceRecords[0]);
                    const faceId = data.FaceRecords[0].Face.FaceId;
                    const payload = {
                        TableName: tableNames.getName('FaceDynamoDbARN'),
                        Item : {          
                            Id : faceId,
                            UserId: userId,
                            CategoryId: categoryId,
                            Frame: frame,
                            Name: name
                        }
                    };
                    console.log(payload);
                    documentClient.put(payload, callback);
                });
        });
}

function getFace(payload, callback) {
    console.log('rekognition.getFaces');

    let userId = payload.UserId;
    let maxResults = payload.MaxResults;

    const collectionId = 'ikncu-' + userId;
    initCollection(collectionId, 
        (err) => {
            var params = {
                CollectionId: collectionId, 
                MaxResults: maxResults
            };
            rekognition.listFaces(params, callback);
        });
}

function deleteFace(payload, callback) {
    let userId = payload.UserId;
    let faceId = payload.FaceId;

    console.log('rekognition.deleteFaces');
    const collectionId = 'ikncu-' + userId;
    initCollection(collectionId, 
        (err) => {
            var params = {
                CollectionId: collectionId, 
                FaceIds: [
                    faceId
                ]
            };
            rekognition.deleteFaces(params, 
                (err,data) => {
                    if (err) callback(err);   
                    console.log(data.FaceRecords[0]);
                    const payload = {
                        TableName: tableNames.getName('FaceDynamoDbARN'),
                        Key : {          
                            Id : faceId
                        }
                    };
                    documentClient.delete(payload, callback);
                });
        });
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
    const method = event.method;
    if(operation === "rekognition")
    {
        switch (method) {
            case 'AddFace':
                addFace(event.payload, callback);
                break;
            case 'DeleteFace':
                deleteFace(event.payload, callback);
                break;
            case 'GetFace':
                getFace(event.payload, callback);
                break;
            default:
                callback(new Error(`Unrecognized operation "${operation}"`));
        }    
    }
    else // database generic operations
    {
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
    }
};
