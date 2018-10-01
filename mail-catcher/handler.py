from __future__ import print_function
import json
import boto3
import logging
import time
import base64
import email
 
def get_attachment(msg, content_type):
    """
    Moves through a tree of email Messages to find an attachment.
    :param msg: An email Message object containing an attachment in its Message tree
    :param content_type: The type of attachment that is being searched for
    :return: An email Message object containing base64 encoded contents (i.e. the attachment)
    """
    attachment = None
    msg_content_type = msg.get_content_type()

    if ((msg_content_type == content_type or msg_content_type == 'text/plain')
            and base64.b64decode(msg.get_payload())):
        attachment = msg

    elif msg_content_type.startswith('multipart/'):
        for part in msg.get_payload():
            attachment = get_attachment(part, content_type)
            attachment_content_type = attachment.get_content_type()

            if (attachment and (attachment_content_type == content_type
                                or attachment_content_type == 'text/plain')
                    and base64.b64decode(attachment.get_payload())):
                break
            else:
                attachment = None

    return attachment

def catch_email(event, context):
    s3 = boto3.resource('s3')
    ses = event["Records"][0]["ses"]
    msg = ses["mail"]
    messageId = ses["mail"]['messageId']
    print('>>>>got message %s' % (messageId))

    message = email.message_from_string(
        s3.Object('corvid-mailbox', messageId).get()['Body'].read().decode('utf-8'))
    attachment = get_attachment(message,"image/jpeg")
    print('>>>>>got attachment')
    print(attachment)
    print('>>>>>got attachment')
    
    filename = "/tmp/%6.2f.jpg" % (time.time())
    with open(filename, 'w+') as file:
        file.write(attachment)
        file.close()
    print('>>>>>saved attachment')

    # bucket_name = 'ecorvid'
    # s3.upload_file(filename, bucket_name, filename)
    # print('uploaded attachment to s3')

    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
