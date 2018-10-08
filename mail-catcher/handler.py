from __future__ import print_function
import json
import boto3
import time
import email
import datetime
 
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

def save_data(user_id, camera_id, labels,s3key):
    client = boto3.client('dynamodb')
    
    l = []
    for label in labels:
        l.append({"M": { label["Name"] : {"N":str(label["Confidence"])}}})
    item = {
        "userid": {"S":user_id},
        "cameraid": {"S":camera_id},
        "happened": {"N": datetime.datetime.today().strftime('%Y%m%d%H%M%S')},
        "labels": {"L":l},
        "frame": {"S":s3key}}

    client.put_item(TableName="events",Item=item)     

# def send_email(sender,recipient,configuration_set,region,subject,body,charset):

#     client = boto3.client('ses',region_name=region)

#     try:
#         response = client.send_email(
#             Destination={
#                 'ToAddresses': [
#                     recipient,
#                 ],
#             },
#             Message={
#                 'Body': {
#                     'Text': {
#                         'Charset': charset,
#                         'Data': body,
#                     },
#                 },
#                 'Subject': {
#                     'Charset': charset,
#                     'Data': sbject,
#                 },
#             },
#             Source=sender,
#             ConfigurationSetName=configuration_set,
#         )
#     except ClientError as e:
#         print(e.response['Error']['Message'])
#     else:
#         print("Email sent! Message ID: %s" % (response['MessageId']))

def detect_labels(bucket, key, max_labels=5, min_confidence=90, region="us-east-1"):
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

    print('...new email: %s / %s' % (mailBucket,messageId))
    message = email.message_from_string(s3.Object(mailBucket, messageId).get()['Body'].read().decode('utf-8'))
    attachment = message.get_payload()[1]
    subject = message['Subject']
    data = attachment.get_payload(decode=True)

    s3client = boto3.client('s3')
    s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)
    print('...image saved: %s / %s' % (frameBucket,messageId))

    labels = detect_labels(frameBucket,messageId)
    if len(labels)>0:
        save_data("111111", subject, labels, messageId)
        print("...labels saved")
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

