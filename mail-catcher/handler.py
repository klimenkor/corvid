from __future__ import print_function
import json
import boto3
import time
import email
 
def catch_email(event, context):
    mailBucket = 'corvid-mailbox'
    frameBucket = 'ecorvid-frames'

    s3 = boto3.resource('s3')
    ses = event["Records"][0]["ses"]
    messageId = ses["mail"]['messageId']
    print('>>>>got message %s' % (messageId))

    message = email.message_from_string(s3.Object(mailBucket, messageId).get()['Body'].read().decode('utf-8'))
    attachment = message.get_payload()[1]
    data = attachment.get_payload(decode=True)

    s3client = boto3.client('s3')
    s3client.put_object(Bucket=frameBucket,Key= messageId,ContentType='image/jpeg',Body=data)
    print('>>>>>saved attachment')

    body = {
        "message": "Attachment (%dbytes) saved as %s in bucket [%s]" % (len(data),messageId,frameBucket)
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
