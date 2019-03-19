from __future__ import print_function

import decimal
import json
import boto3
import email
import re
import pytz
import uuid

from datetime import datetime

from botocore.exceptions import ClientError

def get_arn(name):
    return dict([
    [
        "MotionDynamoDbARN",
        "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-MotionTable-HP1JOWQISUK2"
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
    ])[name]


def get_name(name):
    return get_arn(name).split('/')[1]


API_ID = "gpnyts5i3bhcdnwhqvoivr2mxu"
dynamodb = boto3.resource("dynamodb")
s3client = boto3.client('s3')
s3resource = boto3.resource('s3')
cameraTable = dynamodb.Table(get_name("CameraDynamoDbARN"))
userTable = dynamodb.Table(get_name("UserDynamoDbARN"))
faceTable = dynamodb.Table(get_name("FaceDynamoDbARN"))
motionTable = dynamodb.Table(get_name("MotionDynamoDbARN"))
tz = pytz.timezone('America/Los_Angeles')


def send_email(recipient, subject, body, html):
    sender = "roman.klimenko@gmail.com"
    charset = "UTF-8"
    region = "us-east-1"
    client = boto3.client('ses', region_name=region)

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipient,
                ],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': charset,
                        'Data': body,
                    },
                    'Html': {
                        'Charset': charset,
                        'Data': html,
                    }
                },
                'Subject': {
                    'Charset': charset,
                    'Data': subject,
                },
            },
            Source=sender
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID: %s" % (response['MessageId']))

def get_camera(camera_id):
    item = None
    try:
        response = cameraTable.get_item(
            Key={
                'Id': camera_id
            }
        )

    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        # print(response)
        item = response['Item']

    return item


def get_user(user_id):
    item = None
    try:
        response = userTable.get_item(
            Key={
                'Id': user_id
            }
        )

    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        # print(response)
        item = response['Item']

    return item


def save_motion_data(user_id, camera_id, labels, s3key, faces):
    response = None
    labels_list = []
    for label in labels:
        labels_list.append({"Name": label["Name"], "Confidence": int(round(label["Confidence"]))})

    faces_list = []

    if faces != None:
        print('   saving ' + str(len(faces)) + ' faces')
        for face in faces:
            emotions_list = []
            for emotion in face['Emotions']:
                emotions_list.append({"Type": emotion["Type"], "Confidence": int(round(emotion["Confidence"])) })

            bounding_box = face["BoundingBox"]
            age_range = face["AgeRange"]
            gender = face["Gender"]
            smile = face["Smile"]
            eyeglasses = face["Eyeglasses"]
            sunglasses = face["Sunglasses"]
            beard = face["Beard"]
            mustache = face["Mustache"]
            eyesopen = face["EyesOpen"]
            mouthopen = face["MouthOpen"]
            faces_list.append({
                "Confidence": int(round(face["Confidence"])),
                "Emotions": emotions_list,
                "Box": { "Width":str(bounding_box["Width"]), "Height":str(bounding_box["Height"]), "Left":str(bounding_box["Left"]), "Top":str(bounding_box["Top"])},
                "Age": { "Low": int(round(age_range["Low"])), "High": int(round(age_range["High"])) },
                "Gender": { "Value": gender["Value"], "Confidence": int(round(gender["Confidence"]))},
                "Smile": { "Value": smile["Value"], "Confidence": int(round(smile["Confidence"]))},
                "Eyeglasses": { "Value": eyeglasses["Value"], "Confidence": int(round(eyeglasses["Confidence"]))},
                "Sunglasses": { "Value": sunglasses["Value"], "Confidence": int(round(sunglasses["Confidence"]))}, 
                "Beard": { "Value": beard["Value"], "Confidence": int(round(beard["Confidence"]))},
                "Mustache": { "Value": mustache["Value"], "Confidence": int(round(mustache["Confidence"]))},
                "Eyesopen": { "Value": eyesopen["Value"], "Confidence": int(round(eyesopen["Confidence"]))},
                "Mouthopen": { "Value": mouthopen["Value"], "Confidence": int(round(mouthopen["Confidence"]))}
            })

    try:
        item = {
            "Id": str(uuid.uuid4()),
            "UserId": user_id,
            "CameraId": camera_id,
            "Occurred": datetime.now(tz).strftime('%Y%m%d%H%M%S'),
            "Labels": labels_list,
            "Faces": faces_list,
            "Frame": s3key
        }
        print('Saving new motion...')
        # print(item)
        response = motionTable.put_item(Item = item)
    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        print('...saved')

    return response


def save_face(face_id, user_id, category_id, frame, location):
    response = None
    try:
        item = {
            "Id": face_id,
            "UserId": user_id,
            "CategoryId": category_id,
            "Active": False,
            "Frame": frame,
            "Location": location
        }
        print('Saving new face...')
        # print(item)
        response = faceTable.put_item(Item = item)
    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        print('...saved')

    return response


def detect_labels(bucket, key, max_labels=10, min_confidence=80, region="us-east-1"):
    rekognition = boto3.client("rekognition", region)
    response = rekognition.detect_labels(
        Image={
            "S3Object": {
                "Bucket": bucket,
                "Name": key,
            }
        },
        MaxLabels=max_labels,
        MinConfidence=min_confidence,
    )
    return response['Labels']


def detect_faces(bucket, key, attributes=['ALL'], region="us-east-1"):
    rekognition = boto3.client("rekognition", region)
    response = rekognition.detect_faces(
        Image={
            "S3Object": {
                "Bucket": bucket,
                "Name": key,
            }
        },
        Attributes=attributes,
    )
    return response['FaceDetails']


def parse_subject(subject):
    camera_id = ''
    parse = re.compile('Motion Detection from Cam{(.*)}')
    found = parse.search(subject)
    if found is not None and len(found.groups()) > 0:
        camera_id = found.group(1)
    return camera_id


def get_alarm_labels(enabled_labels, detected_labels):
    labels = []
    for label in detected_labels:
        if label["Name"] in enabled_labels:
            labels.append(label["Name"])
    return labels


def init_collection(user_id):
    id = 'ikncu-%s' % user_id 
    try:
        client=boto3.client('rekognition')
        response=client.create_collection(CollectionId=id)
    except:
        print ('Collection already exists')

    return id

def index_faces(user_id, bucket, frame):
    photo='photo'
    
    collection_id = init_collection(user_id)
    category_id = '4' #Unknown

    client=boto3.client('rekognition')

    response=client.index_faces(
        CollectionId=collection_id,
        Image={'S3Object':{'Bucket':bucket,'Name':frame}},
        ExternalImageId=frame,
        DetectionAttributes=['ALL'])

    for faceRecord in response['FaceRecords']:
        id = faceRecord['Face']['FaceId']
        boundaries = faceRecord['Face']['BoundingBox'] 
        location = {
            'Width': str(boundaries['Width']),
            'Height': str(boundaries['Height']),
            'Left': str(boundaries['Left']),
            'Top': str(boundaries['Top'])
        }
        save_face(id, user_id, category_id, frame, location)

def get_faces_info(faces):
    html_body = "<ul>"
    for face in faces:
        line = "Face ({Confidence}%)".format(**face)
        html_body = html_body + "<li><b>%s</b><ul>" % (line)
        # emotions
        for emotion in face['Emotions']:
            line = "  {Type} : {Confidence}%".format(**emotion)
            html_body = html_body + "<li>%s</li>" % (line)
        html_body = html_body + "</ul><ul>"

        # quality
        for quality, value in face['Quality'].items():
            line = "  {quality} : {value}".format(quality=quality, value=value)
            html_body = html_body + "<li>%s</li>" % (line)
        html_body = html_body + "</ul><ul>"

        html_body = html_body + "</ul>"
    return html_body


def handler(event, context):
    frame_bucket = 'corvid-frames'
    item = event["Records"][0]["s3"]
    mail_bucket = item["bucket"]["name"]
    message_id = item["object"]["key"]
    bucket_path = 'https://s3.amazonaws.com/corvid-frames/'

    print('...new email: %s / %s' % (mail_bucket, message_id))
    message = email.message_from_string(s3resource.Object(mail_bucket, message_id).get()['Body'].read().decode('utf-8'))
    attachment = message.get_payload()[1]
    subject = message['Subject']

    camera_id = parse_subject(subject)
    if camera_id == '':
        print('CameraId was not found in email Subject')
        return

    camera = get_camera(camera_id)
    camera_name = camera['Name']
    user = get_user(camera['UserId'])
    user_id = user['Id']
    alarm_email = user['Email']
    enabled_labels = user['Labels']
    if user_id is not None and camera_id is not None:
        print('...user_id: %s camera_id: %s' % (user_id, camera_id))
        data = attachment.get_payload(decode=True)
        s3client.put_object(Bucket=frame_bucket, Key=message_id, ContentType='image/jpeg', Body=data)
        print('...image saved: %s / %s' % (frame_bucket, message_id))

        labels = detect_labels(frame_bucket, message_id)
        if len(labels) > 0:
            # respone = save_motion_data(user_id, camera_id, labels, message_id)
            print(labels)
            print("...labels saved")
            alarm_labels = get_alarm_labels(enabled_labels, labels)

            faces = None

            # include only effective labels
            if len(alarm_labels) > 0:

                labels_string = ','.join(s for s in alarm_labels)
                timestamp = datetime.now(tz).strftime('%m/%d/%Y %H:%M:%S')
                subject = " %s: %s at %s" % (camera_name, labels_string, timestamp)
                html_body = "<body>"

                # faces
                faces = detect_faces(frame_bucket, message_id)
                if len(faces) > 0:
                    index_faces(user_id, frame_bucket, message_id)
                    html_body = html_body + get_faces_info(faces)                

                html_body = "%s<p><img src=\"%s%s\" width=\"640\"/></p></body>" % (html_body, bucket_path, message_id)
                print("...alarming %s about %s" % (alarm_email, subject))
                send_email(alarm_email, subject, '', html_body)

            else:
                s3client.put_object(Bucket=frame_bucket, Key=message_id, ContentType='image/jpeg', Body=data)

            respone = save_motion_data(user_id, camera_id, labels, message_id, faces)


    body = {
        "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data), message_id, frame_bucket)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
