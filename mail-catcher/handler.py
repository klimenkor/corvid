from __future__ import print_function
import json
import boto3
import time
import email
import datetime
import re

from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError
 
def send_email(recipient,subject,body,html):
    
    sender = "klimenkor@gmail.com"
    charset = "UTF-8"
    region="us-east-1"
    client = boto3.client('ses',region_name=region)

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

def get_settings(user_id):
    item = None
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('settings')
    try:
        response = table.get_item(
            Key={
                'userid': user_id
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print(response)
        item = response['Item']
 
    return item

def save_data(user_id, camera_id, labels,s3key):
    client = boto3.client('dynamodb')
    
    l = {}
    for label in labels:
        l[label["Name"]] = {"N": str(label["Confidence"])}
    
    item = {
        "userid": {"S":user_id},
        "cameraid": {"S":camera_id},
        "happened": {"N": datetime.datetime.today().strftime('%Y%m%d%H%M%S')},
        "labels": {"M":l},
        "frame": {"S":s3key}}
    client.put_item(TableName="events",Item=item)  

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
    userid = ''
    cameraid = ''
    parse = re.compile("Motion Detection from User(.*)-Camera(.*)-")
    found = parse.search(subject)
    if found is not None and len(found.groups())==2:
        userid = found.group(1)
        cameraid = found.group(2)

    return [userid,cameraid]

def labels_of_concern(alarm_labels,detected_labels):
    labels = []
    for label in detected_labels:
        if label["Name"] in alarm_labels:
            labels.append(label["Name"])
    return labels

def catch_email(event, context):
    
    frameBucket = 'corvid-frames'
    s3 = boto3.resource('s3')
    item = event["Records"][0]["s3"]
    mailBucket = item["bucket"]["name"]
    messageId = item["object"]["key"]
    bucketPath = 'https://s3.amazonaws.com/corvid-frames/'

    print('...new email: %s / %s' % (mailBucket,messageId))
    message = email.message_from_string(s3.Object(mailBucket, messageId).get()['Body'].read().decode('utf-8'))
    attachment = message.get_payload()[1]
    subject = message['Subject']

    ids = parse_subject(subject)
    user_id = ids[0]
    camera_id = ids[1]
    alarm_email=""
    alarm_labels=[]
    if user_id is not None and camera_id is not None:
        print('...user_id: %s camera_id: %s' % (user_id,camera_id))
        settings = get_settings(user_id)
        if settings is not None:
            data = attachment.get_payload(decode=True)
            alarm_email = settings['alarm_email']
            alarm_labels = settings['labels']
            s3client = boto3.client('s3')
            s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)
            print('...image saved: %s / %s' % (frameBucket,messageId))

            labels = detect_labels(frameBucket,messageId)
            if len(labels)>0:
                save_data(user_id, camera_id, labels, messageId)
                print("...labels saved")
                l = labels_of_concern(alarm_labels,labels)
                # include only labels of concern
                if len(l)>0:

                    labels_string = ','.join(s for s in l)
                    timestamp = datetime.datetime.today().strftime('%m/%d/%Y %H:%M:%S')
                    subject = " %s: %s at %s"%(camera_id, labels_string, timestamp)
                    html_body = "<body><ul>"
                    # faces
                    for face in detect_faces(frameBucket,messageId):
                        line = "Face ({Confidence}%)".format(**face)
                        html_body = html_body + "<li><b>%s</b><ul>"%(line) 
                        # emotions
                        for emotion in face['Emotions']:
                            line = "  {Type} : {Confidence}%".format(**emotion)
                            html_body = html_body + "<li>%s</li>"%(line) 
                        html_body = html_body + "</ul><ul>" 
                        
                        # quality
                        for quality, value in face['Quality'].items():
                            line = "  {quality} : {value}".format(quality=quality, value=value)
                            html_body = html_body + "<li>%s</li>"%(line) 
                        html_body = html_body + "</ul><ul>" 

                        # facial features
                        # FEATURES_BLACKLIST = ("Landmarks", "Emotions", "Pose", "Quality", "BoundingBox", "Confidence")
                        # for feature, data in face.items():
                        #     if feature not in FEATURES_BLACKLIST:
                        #         line = "  {feature}({data['Value']}) : {data['Confidence']}%".format(feature=feature, data=data)  
                        #         html_body = "<li>%s</li>"%(line)       
                        # html_body = html_body + "</ul></ul>" 
                        
                        html_body = html_body + "</ul>" 


                    html_body = "%s<p><img src=\"%s%s\" width=\"640\"/></p><body>"%(html_body,bucketPath,messageId) 
                    print("...alarming %s about %s"%(alarm_email,subject))
                    send_email(alarm_email,subject,'',html_body)



            else:
                s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)

    body = {
        "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data),messageId,frameBucket)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    
    return response

