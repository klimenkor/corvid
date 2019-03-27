let tableNames = require('./settings.js');
let AWS = require('aws-sdk');
let s3 = new AWS.S3();
let rekognition = new AWS.Rekognition();
let docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
let simpleParser = require('mailparser').simpleParser;
var Jimp = require('jimp');

AWS.config.update({region: 'us-east-1'});

console.log(tableNames.getName('UserDynamoDbARN'));

function sendEmail(recipient, subject, body, html, callback) {
    const sender = "roman.klimenko@gmail.com"
    const charset = "UTF-8"
    const region = "us-east-1"
    const client = boto3.client('ses', region_name=region)

    try {
        var params = {
            Destination: { 
              ToAddresses: [ recipient ]
            },
            Message: { 
              Body: { 
                Html: {
                 Charset: 'UTF-8',
                 Data: html
                },
                Text: {
                 Charset: 'UTF-8',
                 Data: body
                }
               },
               Subject: {
                Charset: 'UTF-8',
                Data: subject
               }
              },
            Source: sender
          };

        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
            .sendEmail(params).promise();

        sendPromise.then(
          function(data) {
            console.log("Email sent! Message ID: " + data.MessageId);
            callback(null,data.MessageId);
        }).catch(
            function(err) {
                console.error(err, err.stack);
                callback(err,null)
          });

    }
    catch (err) {
        print(err.stack)
        callback(e,null)
    }

    return;
}

function getObject(table, id, callback){
    try {
        var params = {
            TableName: tableNames.getName(table + 'DynamoDbARN'),
            Key: {'Id': id}
        };
           
        docClient.get(params, function(err, data) {
            if (err) {
                callback(err, null);

            } else {
                if(data !== undefined) {
                    callback(null,data.Item);
                } else { callback(true,null); }
            }
        });
    } catch (err) {       
        callback(err.stack,null);
    }
    return;
}

function saveObject(table, item, callback){
    try {
        var params = {
            TableName: tableNames.getName(table + 'DynamoDbARN'),
            Item: item
        };
           
        docClient.put(params, function(err, data) {
            if (err) {
                callback(err, null);

            } else {
                callback(null,data.Item);
            }
        });
    } catch (err) {       
        callback(err.stack,null);
    }
    return;
}

function saveMotionData(userId, cameraId, labels, s3key, faces) {
    var labels_list = [];

    labels.forEach(label => {
        labels_list.push({"Name": label.Name, "Confidence": Math.round(label.Confidence)});
    }); 
    
    faces_list = []

    if (faces !== null) {
        print('   saving ' + str(len(faces)) + ' faces')
        
        faces.forEach(face => {
            var emotions_list = [];
            face.Emotions.forEach(emotion => {
                emotions_list.push({"Type": emotion.Type, "Confidence": Math.round(emotion.Confidence)});
            });

            bounding_box = face.BoundingBox;
            age_range = face.AgeRange;
            gender = face.Gender;
            smile = face.Smile;
            eyeglasses = face.Eyeglasses;
            sunglasses = face.Sunglasses;
            beard = face.Beard;
            mustache = face.Mustache;
            eyesopen = face.EyesOpen;
            mouthopen = face.MouthOpen;
            faces_list.push({
                "Confidence": int(round(face.Confidence)),
                "Emotions": emotions_list,
                "Box": { "Width": str(bounding_box.Width), "Height":str(bounding_box.Height), "Left":str(bounding_box.Left), "Top":str(bounding_box.Top)},
                "Age": { "Low": int(round(age_range.Low)), "High": int(round(age_range.High)) },
                "Gender": { "Value": gender.Value, "Confidence": int(round(gender.Confidence))},
                "Smile": { "Value": smile.Value, "Confidence": int(round(smile.Confidence))},
                "Eyeglasses": { "Value": eyeglasses.Value, "Confidence": int(round(eyeglasses.Confidence))},
                "Sunglasses": { "Value": sunglasses.Value, "Confidence": int(round(sunglasses.Confidence))}, 
                "Beard": { "Value": beard.Value, "Confidence": int(round(beard.Confidence))},
                "Mustache": { "Value": mustache.Value, "Confidence": int(round(mustache.Confidence))},
                "Eyesopen": { "Value": eyesopen.Value, "Confidence": int(round(eyesopen.Confidence))},
                "Mouthopen": { "Value": mouthopen.Value, "Confidence": int(round(mouthopen.Confidence))}
            })
        });
    }

    item = {
        "Id": str(uuid.uuid4()),
        "UserId": user_id,
        "CameraId": camera_id,
        "Occurred": int(datetime.now(tz).strftime('%Y%m%d%H%M%S')),
        "Labels": labels_list,
        "Faces": faces_list,
        "Frame": s3key
    }
    console.log('Saving new motion...')

    saveObject('MotionDynamoDbARN', item, 
        (err, data) => {
            if(err!==null){
                callback(err,null);
            }
            else {
                callback(null,data);
            }
        });

    return;
}    

function detectlabels(bucket, key, max_labels=10, min_confidence=80, region="us-east-1") {
    let param = { 
        Image = {
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        },
        MaxLabels=max_labels,
        MinConfidence=min_confidence
    };
    rekognition.detectLabels(param,(err,data)=>{
        if(err!==null){
            callback(err,null);
        }
        else {
            if(data !== null)
                callback(null,data.Labels);
            else
                callback(null,null);
        }
    });
}

function detectFaces(bucket, key, attributes=['ALL'], region="us-east-1") {
    let param = { 
        Image = {
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        },
        Attributes = attributes
    };
    rekognition.detectFaces(param,(err,data)=>{
        if(err!==null){
            callback(err,null);
        }
        else {
            if(data !== null)
                callback(null,data.FaceDetails);
            else
                callback(null,null);
        }
    });
}

function parseCameraId(subject) {
    parse = /Motion Detection from Cam{(.*)}/.exec(subject)
    if(parse === null)
        return null;
    return parse[1];    
}

function getAlarmLabels(enabled, detected) {
    let labels = []
    detected.forEach( dl => {
        let found = enabled.find(el => { return el.Name == dl.Name; });
        if(found) {
            labels.push(found.Name);
        }
    });
    return labels;
}

function initCollection(userid) {

}

function indexFace(userId, bucket, frame) {

}

function getFacesInfo(faces) {
    let html_body = "<ul>";
    faces.forEach(face => {
        let header = "Face ${face.Confidence}%<li><b>${line}</b><ul>";
        let footer = "</ul><ul>";
        emotions = ""
        face.Emotions.forEach(emotion => {
            emotions = emotions + "<li>{Type} : ${emotion.Confidence}%</li></ul><ul>"
        });

        qualities = ""    
        face.Quality.items.forEach(item => {
            qualities = qualities + "<li>${quality} : ${value}</li>"
        });
        html_body = html_body + header + emotions + qualities + footer;
    });
    html_body = html_body + "</ul>";

    return html_body
}

function saveFrame(bucket,key,data,callback) {
    params = {
        Bucket: bucket, 
        Key: key,
        ContentType: 'image/jpeg', 
        Body: data    
    };
    s3.putObject(params, 
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    return;    
}
exports.handler = function (event, context, callback) {
    const frameBucket = 'corvid-frames';
    const item = event.Records[0].s3;
    const mailBucket = item.bucket.name;
    const messageId = item.object.key;
    // const bucketPath = 'https://s3.amazonaws.com/corvid-frames/';

    console.log('...new email:' + mailBucket + ' / ' + messageId);
    var params = {
        Bucket: mailBucket, 
        Key: messageId
       };
       s3.getObject(params, function(err, data) {
         if (err) {
             console.log(err, err.stack); 
         }
         else {
            simpleParser(data.Body, (err, mail) => {
                if(err){
                    console.log(err)
                    callback(null, null);
                    return;
                } 
                console.log('Subject: ' + mail.subject);
                let cameraId = parseCameraId(mail.subject);
                if(cameraId === null) {
                    callback(true,'Invalid CameraId in mail subject');
                    return;
                }
                getObject('Camera', cameraId, (err, data) => {
                    if(err !== null || data === null) {
                        callback(err, null);
                        return;
                    }

                    let camera = data;
                    getObject('User', camera.UserId, (err, data) => {
                        if(err !== null){
                            callback(err, null);
                            return;
                        }
                            
                        let user = data;
                        console.log('UserId = ' + user.Id);
                        console.log('Camera name = ' + camera.Name);        
                        console.log('Email = ' + user.Email);  
                        let enabledLables = user.Labels;  
                        if(enabledLables.length === 0)
                            return; // nothing to signal about

                        detectedLabels = detectLabels(frameBucket, messageId);    

                        alarmLabels = getAlarmLabels(enabledLabels, labels)

                        let image = mail.attachments[0].content;
                        saveFrame(frameBucket, messageId, image, (err) => {
                            if (err) {
                                console.log(err, err.stack); 
                                callback();
                            } else {
                                console.log('Uploaded');
                                callback();
                            }
                        });  
                    });       
                });
            })
         }     
       });
};