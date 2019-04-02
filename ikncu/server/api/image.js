let tableNames = require('./settings.js');
let AWS = require('aws-sdk');
let s3 = new AWS.S3();
let rekognition = new AWS.Rekognition();
let docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
let simpleParser = require('mailparser').simpleParser;
var Jimp = require('jimp');
let uuidv1 = require('uuid/v1');
AWS.config.update({region: 'us-east-1'});

console.log(tableNames.getName('UserDynamoDbARN'));

function sendEmail(recipient, subject, body, html) {
    const sender = "roman.klimenko@gmail.com"

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
            // callback(null,data.MessageId);
        }).catch(
            function(err) {
                console.error(err, err.stack);
                // callback(err,null)
          });

    }
    catch (err) {
        console.log(err.stack);
        // callback(e,null)
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

function saveMotionData(userId, cameraId, labels, key, faces) {
    var labels_list = [];

    labels.forEach(label => {
        labels_list.push({"Name": label.Name, "Confidence": Math.round(label.Confidence)});
    }); 
    
    facesList = []

    if (faces !== null) {
        console.log('saving ' + faces.length.toString() + ' faces');
        
        faces.forEach(face => {
            var emotionsList = [];
            face.Emotions.forEach(emotion => {
                emotionsList.push({'Type': emotion.Type, 'Confidence': Math.round(emotion.Confidence)});
            });

            boundingBox = face.BoundingBox;
            ageRange = face.AgeRange;
            gender = face.Gender;
            smile = face.Smile;
            eyeGlasses = face.Eyeglasses;
            sunGlasses = face.Sunglasses;
            beard = face.Beard;
            mustache = face.Mustache;
            eyesOpen = face.EyesOpen;
            mouthOpen = face.MouthOpen;
            facesList.push({
                "Confidence": Math.round(face.Confidence),
                "Emotions": emotionsList,
                "Box": { "Width": boundingBox.Width, "Height":boundingBox.Height, "Left":boundingBox.Left, "Top":boundingBox.Top},
                "Age": { "Low": Math.round(ageRange.Low), "High": Math.round(ageRange.High)},
                "Gender": { "Value": gender.Value, "Confidence": Math.round(gender.Confidence)},
                "Smile": { "Value": smile.Value, "Confidence": Math.round(smile.Confidence)},
                "Eyeglasses": { "Value": eyeGlasses.Value, "Confidence": Math.round(eyeGlasses.Confidence)},
                "Sunglasses": { "Value": sunGlasses.Value, "Confidence": Math.round(sunGlasses.Confidence)}, 
                "Beard": { "Value": beard.Value, "Confidence": Math.round(beard.Confidence)},
                "Mustache": { "Value": mustache.Value, "Confidence": Math.round(mustache.Confidence)},
                "Eyesopen": { "Value": eyesOpen.Value, "Confidence": Math.round(eyesOpen.Confidence)},
                "Mouthopen": { "Value": mouthOpen.Value, "Confidence": Math.round(mouthOpen.Confidence)}
            })
        });
    }

    item = {
        "Id": uuidv1(),
        "UserId": userId,
        "CameraId": cameraId,
        "Occurred": parseInt(getYYYMMDDHHMMSS()),
        "Labels": labels,
        "Faces": faces,
        "Frame": key
    }
    console.log('Saving new motion...');
    console.log(item);

    saveObject('Motion', item, 
        (err, data) => {
            if(err!==null){
                console.log('failed to save motion');
                console.log(err);
            }
            else {
                console.log('saved motion');
            }
        });

    return;
}    

function detectLabels(bucket, key, callback) {
    let maxLabels=10;
    let minConfidence=80;
    let region='us-east-1';
    let param = { 
        Image: {
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        },
        MaxLabels: maxLabels,
        MinConfidence: minConfidence
    };
    console.log(param);
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

function saveFaces(image, faces, bucket, frame, callback) {
    const jimage = new Jimp(image, (res) => {
        var w = jimage.bitmap.width; 
        var h = jimage.bitmap.height;
        let i = 0;
        faces.forEach(face => {
            let box = face.BoundingBox;
            var cx = box.Left * w;
            var cy = box.Top * h;
            var cw = box.Width * w;
            var ch = box.Height * w;
    
            jimage.crop( cx, cy, cw, ch, () => {
                i = i + 1;
                let key = frame + '/' + i.toString();
        
                jimage.getBuffer(Jimp.MIME_JPEG,(err, res) => {
                    saveFrame(bucket, key, res, () => {
                        callback();
                    });
                });
            });
        });
    });
}

function detectFaces(bucket, key, callback) {
    let attributes=['ALL'];
    let region='us-east-1';

    let param = { 
        Image: {
            'S3Object': {
                'Bucket': bucket,
                'Name': key
            }
        },
        Attributes: attributes
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
        let found = enabled.find(el => { return el == dl.Name && dl.Confidence > 50.0; });
        if(found) {
            labels.push(found);
        }
    });
    return labels;
}

function initCollection(userid) {

}

function indexFace(userId, bucket, frame) {

}

function getFacesInfo(faces) {
    let html = "<ul>";
    let footer = '</ul><ul>';
    faces.forEach(face => {
        let header = '<li><b>Face ' + face.Confidence + '%</b>';
        let emotions = '';
        face.Emotions.forEach(emotion => {
            emotions = emotions + '<li>' + emotion.Type + ': ' + emotion.Confidence + '%</li>'
        });

        let qualities = '';   
        Object.keys(face.Quality).forEach(item => {
            qualities = qualities + '<li>' + item + ':' + face.Quality[item] + '</li>';
        });

        html = html + header + '<ul>' + emotions + '</ul><ul>' + qualities + '</ul>';

    }); 
    html = html + footer;
    return html;
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
                console.log(err, err.stack); 
                callback();
            } else {
                console.log('Uploaded');
                callback();
            }
        });
    return;    
}

function getTimestamp() {
    let d = new Date();
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

function getYYYMMDDHHMMSS() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    var hh = x.getHours().toString();
    var mm = x.getMinutes().toString();
    var ss = x.getSeconds().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    (hh.length == 1) && (hh = '0' + hh);
    (mm.length == 1) && (mm = '0' + mm);
    (ss.length == 1) && (ss = '0' + ss);
    var res = y + m + d + hh + mm + ss;
    return res;
}

function formatAlarmMessage(cameraName, labels) {
    let labelsString = labels.join(',');
    return cameraName + ': ' + labelsString + ' recorded on ' + getTimestamp() + ' (ikncu)';
}

function formatAlarmBodyHeader() {
    return '<body>';
}

function formatAlarmBodyFooter(bucket, messageId) {
    let path = 'https://s3.amazonaws.com/' + bucket + '/' + messageId; 
    return '<p><img src="' + path + '" width=\"640\"/></p></body>';
}

exports.handler = function (event, context, callback) {
    const frameBucket = 'ikncu-frames';
    const item = event.Records[0].s3;
    const mailBucket = item.bucket.name;
    const messageId = item.object.key;

    console.log('...new email:' + mailBucket + ' / ' + messageId);
    var params = {
        Bucket: mailBucket, 
        Key: messageId
       };
       s3.getObject(params, function(err, data) {
         if (err) {
             console.log(err, err.stack); 
             callback(null,null);
             return;
         }
        simpleParser(data.Body, (err, mail) => {
            if(err){
                console.log(err)
                callback(null, null);
                return;
            } 
            let image = mail.attachments[0].content;
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
                    console.log(user.Labels);  
                    let enabledLabels = user.Labels;  
                    if(enabledLabels.length === 0)
                        return; // nothing to signal about

                    console.log('detecting labels');  
                    detectLabels(frameBucket, messageId, (err,data) => {
                        if(err!==null) {
                            callback(err);
                            return;     
                        }
                        console.log(data);  
                        let detectedLabels = data;

                        console.log('getting configured labels');  
                        let labels = getAlarmLabels(enabledLabels, detectedLabels);
                        console.log(labels);
                        if(labels.length>0) {
                            console.log('detecting faces');  
                            detectFaces(frameBucket, messageId, (err,data) => {
                                if(err!==null) {
                                    callback(err);
                                    return;     
                                }
                                console.log(data);  
                                faces = data;

                                console.log('cropping faces');
                                saveFaces(image, faces, frameBucket, messageId, () =>
                                {
                                    console.log('saved faces');
                                });

                                console.log('sending an email');  
                                let subject = formatAlarmMessage(camera.Name, labels);
                                let body = formatAlarmBodyHeader() + 
                                    getFacesInfo(faces) + 
                                    formatAlarmBodyFooter(frameBucket, messageId);
                                sendEmail(user.Email, subject, '', body);    
                                saveMotionData(user.Id, camera.Id, labels, messageId, faces);
                            });        
                            saveFrame(frameBucket, messageId, image, (err,data) => {
                                console.log('uploaded');
                            });
                        }
                    });    
                });       
            });
        })
    });
};