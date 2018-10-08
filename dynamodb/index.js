var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

// var params = {
//     TableName: 'events',
//     Item: {
//         cameraid: "010",
//         labels: [
//           {
//             person: 23
//           },
//           {
//             dog: 44
//           }
//         ],
//         time: 20181002191500,
//         userid: "11111"
//       }
//   };
  
  var docClient = new AWS.DynamoDB.DocumentClient();
  
//   docClient.put(params, function(err, data) {
//     if (err) console.log(err);
//     else console.log(data);
//   });

var params = {
    TableName : "events",
    KeyConditionExpression: "userid = :i and happened > :t",
    ExpressionAttributeValues: {
        ":i": "111111",
        ":t": 20181006000000
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        i=0;
        data.Items.forEach(function(item) {
            i++;
            console.log("UserId:" + item.userid + " CameraId:" + item.cameraid + " Time: " + item.happened);
            console.log("image:" + item.frame);
           
            item.labels.forEach(function(label){
                Object.keys(label).forEach(function(key) {
                    console.log(key + " = "+ label[key] + "%");    
                });
            });    
            console.log("==========================================");
        });
        console.log("Total " + i);

    }
});


