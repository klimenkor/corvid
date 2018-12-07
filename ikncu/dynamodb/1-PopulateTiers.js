var AWS = require('aws-sdk');
var print = require('lib/helpers').printPretty;
var dynamodb = new AWS.DynamoDB();
var graphQLAPIId = "gpnyts5i3bhcdnwhqvoivr2mxu";
import * as shortid from 'node_modules/shortid';

var params = {
  "TableName": "Tier-" + graphQLAPIId,
  "Item": {
    "Id": { "S": shortid.generate() },
    "Name": { "S": "Tier 1" }
  },
  "ReturnConsumedCapacity": "TOTAL"
};

var promise = dynamodb.putItem(params).promise();

promise
  .then(print)
  .catch(print);
