const keys = require('./settings.js');
var copy = require('copy-dynamodb-table').copy

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1', apiVersion: '2012-08-10'});

copy({
    source: {
      tableName: 'User', 
      region: 'us-east-1'
    },
    destination: {
      tableName: keys.getName('UserDynamoDbARN'),
      region: 'us-east-1'
    },
    log: true, // default false
    create : true // create destination table if not exist
  },
  function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });

