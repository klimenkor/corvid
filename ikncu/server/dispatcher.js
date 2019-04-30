let tableNames = require('./settings.js');
let AWS = require('aws-sdk');
var moment = require('moment');
let s3 = new AWS.S3();
let rekognition = new AWS.Rekognition();
let docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
let simpleParser = require('mailparser').simpleParser;
var Jimp = require('jimp');
let uuidv1 = require('uuid/v1');
AWS.config.update({region: 'us-east-1'});
const s3url = 'https://s3.amazonaws.com/';
const frameBucket = 'ikncu-frames';
const faceBucket = 'ikncu-faces';

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

function saveMotionData(userId, cameraId, labels, key, faces, utcOffset) {
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
        "Occurred": parseInt(moment().utcOffset(utcOffset).format("YYYYMMDDHHmmss")),
        "Labels": labels,
        "Faces": facesList,
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

function saveFaces(image, faces, bucket, userId, frame, callback) {
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
    
            let img = jimage.clone();
            console.log('...cropping:');
            img.crop( cx, cy, cw, ch, 
                (err,data) => {
                    if(err!==null){
                        callback(err,null);
                        return;
                    }
                    i = i + 1;
                    let key = userId + '/' + frame + '/' + i.toString();
            
                    console.log('...buffering:');
                    img.getBuffer(Jimp.MIME_JPEG,(err, res) => {
                        console.log('...saving to ' + bucket + '/' + key);
                        saveFrame(bucket, key, res, 
                            (err,data) => {
                                
                                callback(err,data);

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

function getFacesInfo(faces, bucket, userId, key) {
    let html = "<ul>";
    let footer = '</ul><ul>';
    let path = s3url + bucket + '/' + userId + '/' + key; 

    let i = 1     
    faces.forEach(face => {
        html = html + '<table><tr><td><img src="' + path + '/' + i + '" width=\"50\"/></td><td>';
        let header = '<li><b>Face ' + Math.round(parseFloat(face.Confidence)) + '%</b>';
        let emotions = '';
        face.Emotions.forEach(emotion => {
            emotions = emotions + '<li>' + emotion.Type + ': ' + Math.round(parseFloat(emotion.Confidence)) + '%</li>'
        });

        let qualities = '';   
        Object.keys(face.Quality).forEach(item => {
            qualities = qualities + '<li>' + item + ':' + Math.round(parseFloat(face.Quality[item])) + '%</li>';
        });

        photo = '<img src="' + path + '/' + i + '" width=\"50\"/>';

        html = html + header + '<ul>' + emotions + '</ul><ul>' + qualities + '</ul></td></tr></table>';
        i = i + 1;
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

// function getYYYMMDDHHMMSS() {
//     var x = new Date();
//     var y = x.getFullYear().toString();
//     var m = (x.getMonth() + 1).toString();
//     var d = x.getDate().toString();
//     var hh = x.getHours().toString();
//     var mm = x.getMinutes().toString();
//     var ss = x.getSeconds().toString();
//     (d.length == 1) && (d = '0' + d);
//     (m.length == 1) && (m = '0' + m);
//     (hh.length == 1) && (hh = '0' + hh);
//     (mm.length == 1) && (mm = '0' + mm);
//     (ss.length == 1) && (ss = '0' + ss);
//     var res = y + m + d + hh + mm + ss;
//     return res;
// }

function formatAlarmMessage(cameraName, labels) {
    let labelsString = labels.join(',');
    return cameraName + ': ' + labelsString + ' recorded on ' + getTimestamp() + ' (ikncu)';
}

function formatAlarmBodyHeader() {
    return '<body>';
}

function formatAlarmBodyFooter(bucket, messageId) {
    let path = s3url + bucket + '/' + messageId; 
    return '<p><img src="' + path + '" width=\"640\"/></p></body>';
}

exports.handler = function (event, context, callback) {
    if(event.Records === undefined)
    {
        console.log('handler: Malformed event object'); 
        callback(null,null);
        return;
    }
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
        console.log('...parsing an email');
        simpleParser(data.Body, (err, mail) => {
            if(err){
                console.log(err)
                callback(null, null);
                return;
            } 
            console.log('...getting an image');
            let image = mail.attachments[0].content;
            console.log('Subject: ' + mail.subject);
            let cameraId = parseCameraId(mail.subject);
            if(cameraId === null) {
                callback(true,'Invalid CameraId in mail subject');
                return;
            }
            getObject('Camera', cameraId, (err, data) => {
                if(err !== null || data === null || data === undefined) {
                    callback(err, 'Camera is not registered');
                    return;
                }

                let camera = data;
                console.log('...getting a user');
                getObject('User', camera.UserId, (err, data) => {
                    if(err !== null){
                        callback(err, 'User is not registered');
                        callback(err, null);
                        return;
                    }
                        
                    let user = data;
                    console.log('UserId = ' + user.Id);
                    console.log('Camera name = ' + camera.Name);        
                    console.log('Email = ' + user.Email);  
                    console.log(user.Labels);  

                    let utcOffset = -420; /// should include int User
                    let enabledLabels = user.Labels;  
                    if(enabledLabels.length === 0)
                        return; // nothing to signal about

                    saveFrame(frameBucket, messageId, image, (err,data) => {
                        console.log('uploaded');
                        console.log('detecting labels');  
                        detectLabels(frameBucket, messageId, (err,data) => {
                            if(err!==null) {
                                callback(err);
                                return;     
                            }
                            
                            let detectedLabels = data;
                            console.log(detectLabels.length + ' labels found');  
                            if (detectLabels.length==0)
                                return;

                            console.log('getting configured labels');  
                            let labels = getAlarmLabels(enabledLabels, detectedLabels);
                            console.log(labels.length + ' labels to signal');  
                            if(labels.length==0) 
                                return;

                            console.log('detecting faces');  
                            detectFaces(frameBucket, messageId, (err,data) => {
                                if(err!==null) {
                                    callback(err);
                                    return;     
                                }
                                console.log(data);  
                                faces = data.filter( item => item.Confidence > 90 );
                                console.log(faces.length + ' faces found');  
                                if(faces.length>0) {
                                    console.log('cropping faces');
                                    saveFaces(image, faces, faceBucket, user.Id, messageId, 
                                        (err,data) =>
                                        {
                                            if(err!==null) {
                                                console.log(err);
                                                callback(err);
                                                return;     
                                            }
                                            console.log('saved faces');
                                        });
                                }
                                        
                                console.log('sending an email');  
                                let subject = formatAlarmMessage(camera.Name, labels);
                                let body = formatAlarmBodyHeader() + 
                                    getFacesInfo(faces, faceBucket, user.Id, messageId) + 
                                    formatAlarmBodyFooter(frameBucket, messageId);
                                sendEmail(user.Email, subject, '', body);    
                                saveMotionData(user.Id, camera.Id, detectedLabels, messageId, faces, utcOffset);
                            });        
                        });  
                    });
                });       
            });
        })
    });
};