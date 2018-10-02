from __future__ import print_function
import json
import boto3
import time
import email
 
# import botocore

# def object_ready(bucket,key):
#     try:
#         s3 = boto3.resource('s3')
#         s3.Object(bucket,key).load()
#     except botocore.exceptions.ClientError as e:
#         if e.response['Error']['Code'] == "403":
#             return False
#         else:
#             raise
#     else:
#         return True

# def catch_email(event, context):
#     mailBucket = 'corvid-mailbox'
#     frameBucket = 'ecorvid-frames'

#     s3 = boto3.resource('s3')
#     ses = event["Records"][0]["ses"]
#     messageId = ses["mail"]['messageId']
#     print('>>>>got message %s' % (messageId))

#     attempt = 0
#     ready = False
#     while attempt<10:
#         ready = object_ready(mailBucket, messageId)
#         if ready:
#             break
#         else:
#             attempt=attempt+1
#             time.sleep(1)            
#     if ready:
#         message = email.message_from_string(s3.Object(mailBucket, messageId).get()['Body'].read().decode('utf-8'))
#         attachment = message.get_payload()[1]
#         data = attachment.get_payload(decode=True)

#         s3client = boto3.client('s3')
#         s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)
#         print('>>>>>saved attachment')

#         body = {
#             "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data),messageId,frameBucket)
#         }

#         response = {
#             "statusCode": 200,
#             "body": json.dumps(body)
#         }
#     else:
#         body = {
#             "message": "Message was not found"
#         }

#         response = {
#             "statusCode": 404
#         }

#     return response

def send_email(sender,recipient,configuration_set,region,subject,body,charset):

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
                },
                'Subject': {
                    'Charset': charset,
                    'Data': sbject,
                },
            },
            Source=sender,
            ConfigurationSetName=configuration_set,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID: %s" % (response['MessageId']))

def detect_labels(bucket, key, max_labels=10, min_confidence=60, region="us-east-1"):
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

def catch_email(event, context):
    
    frameBucket = 'corvid-frames'
    s3 = boto3.resource('s3')
    item = event["Records"][0]["s3"]
    mailBucket = item["bucket"]["name"]
    messageId = item["object"]["key"]

    print('  new: %s / %s' % (mailBucket,messageId))

    message = email.message_from_string(s3.Object(mailBucket, messageId).get()['Body'].read().decode('utf-8'))
    attachment = message.get_payload()[1]
    data = attachment.get_payload(decode=True)

    s3client = boto3.client('s3')
    s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)
    print('  saved: %s / %s' % (frameBucket,messageId))

    detected = ""
    for label in detect_labels(frameBucket,messageId):
	    detected = detected + "{Name} - {Confidence}%, ".format(**label)

    print('  detected: %s' % (detected))
    send_email("klimenkor@gmail.com","roman.klimenko@gmail.com","ConfigSet","us-east-1","Detected objects",detected,"UTF-8")

    body = {
        "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data),messageId,frameBucket)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }
    
    return response

