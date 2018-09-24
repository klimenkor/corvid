from __future__ import print_function

import boto3
import datetime
import time
import json
import decimal
from datetime import timedelta
import uuid
import cv2

class DecimalEncoder(json.JSONEncoder):
    def default(self, o): # pylint: disable=E0202
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def load_config():

    with open('../../config/framefetcher-params.json', 'r') as conf_file:
        conf_json = conf_file.read()
        return json.loads(conf_json)

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
    }


def fetch_frames(event, context):
    s3 = boto3.resource('s3')
    config = load_config()
       
    print ("-------------------------------------------------")
    print(event)
    for record in event["Records"]:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key'] 
        print (bucket)
        print (key)
        fileName = '/tmp/{}{}'.format(uuid.uuid4(), key)
        s3.Bucket(bucket).download_file(key,fileName)
        print(fileName)
        movedFile = fileName.replace("264","mp4")
        video = cv2.VideoCapture(fileName)
        fps = int(video.get(cv2.CAP_PROP_FPS))
        print("   %6.2f fps" % fps)

        # capture 1 frame per second
        count = 0
        success, frame = video.read()
        while success:
            success, frame = video.read()

            if count % fps == 0:
                index = "-%#05d.jpg" % (count + 1)
                outputFile = fileName.replace(".264", index)
                cv2.imwrite(outputFile, frame)
                print("     ", outputFile)
            count = count + 1

        video.release()

        # rename(fileName, movedFile)

def handler(event, context):
    return fetch_frames(event, context)
