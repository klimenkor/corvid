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

API_ID = "gpnyts5i3bhcdnwhqvoivr2mxu"
dynamodb = boto3.resource("dynamodb")
s3client = boto3.client('s3')
s3resource = boto3.resource('s3')
cameraTable = dynamodb.Table('Camera-' + API_ID)
userTable = dynamodb.Table('User-' + API_ID)
faceTable = dynamodb.Table('Face-' + API_ID)
motionTable = dynamodb.Table('Motion-' + API_ID)
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


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


def get_camera(camera_id):
    item = None
    try:
        response = cameraTable.get_item(
            Key={
                'id': camera_id
            }
        )

    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        print(response)
        item = response['Item']

    return item


def get_user(user_id):
    item = None
    try:
        response = userTable.get_item(
            Key={
                'id': user_id
            }
        )

    except ClientError as e:
        print(e.response['Error']['Message'])

    else:
        print(response)
        item = response['Item']

    return item


def save_motion_data(user_id, camera_id, labels, s3key):
    response = None
    labels_list = []
    for label in labels:
        labels_list.append({"name": label["Name"], "confidence": int(round(label["Confidence"]))})
    try:
        item = {
            "id": str(uuid.uuid4()),
            "userId": user_id,
            "cameraId": camera_id,
            "occurred": datetime.now(tz).strftime('%Y%m%d%H%M%S'),
            "labels": labels_list,
            "frame": s3key
        }
        print('Saving new motion...')
        print(item)
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
            "id": face_id,
            "userId": user_id,
            "categoryId": category_id,
            "active": False,
            "frame": frame,
            "location": location
        }
        print('Saving new face...')
        print(item)
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
            'width': str(boundaries['Width']),
            'height': str(boundaries['Height']),
            'left': str(boundaries['Left']),
            'top': str(boundaries['Top'])
        }
        save_face(id, user_id, category_id, frame, location)
       

def catch_email(event, context):
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
    camera_name = camera['name']
    user = get_user(camera['userId'])
    user_id = user['id']
    alarm_email = user['email']
    enabled_labels = user['labels']
    if user_id is not None and camera_id is not None:
        print('...user_id: %s camera_id: %s' % (user_id, camera_id))
        data = attachment.get_payload(decode=True)
        s3client.put_object(Bucket=frame_bucket, Key=message_id, ContentType='image/jpeg', Body=data)
        print('...image saved: %s / %s' % (frame_bucket, message_id))

        labels = detect_labels(frame_bucket, message_id)
        if len(labels) > 0:
            respone = save_motion_data(user_id, camera_id, labels, message_id)
            
            print("...labels saved")
            alarm_labels = get_alarm_labels(enabled_labels, labels)

            # include only effective labels
            if len(alarm_labels) > 0:

                labels_string = ','.join(s for s in alarm_labels)
                timestamp = datetime.now(tz).strftime('%m/%d/%Y %H:%M:%S')
                subject = " %s: %s at %s" % (camera_name, labels_string, timestamp)
                html_body = "<body><ul>"
                # faces
                faces = detect_faces(frame_bucket, message_id)
                if len(faces) > 0:
                    index_faces(user_id, frame_bucket, message_id)

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

                html_body = "%s<p><img src=\"%s%s\" width=\"640\"/></p><body>" % (html_body, bucket_path, message_id)
                print("...alarming %s about %s" % (alarm_email, subject))
                send_email(alarm_email, subject, '', html_body)

            else:
                s3client.put_object(Bucket=frame_bucket, Key=message_id, ContentType='image/jpeg', Body=data)

    body = {
        "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data), message_id, frame_bucket)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
