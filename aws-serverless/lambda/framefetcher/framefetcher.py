from __future__ import print_function

import boto3
import datetime
import time
import json
import decimal
from datetime import timedelta


class DecimalEncoder(json.JSONEncoder):
    def default(self, o): # pylint: disable=E0202
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

def load_config():

    with open('framefetcher-params.json', 'r') as conf_file:
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
    print ( "Done!")
    s3_client = boto3.client('s3')
    config = load_config()

    # processed = 0
    # videos = findFiles(source, extension)
    # if len(videos) > 0:
    #     print("found ", videos)

    #     for file in videos:

    #         try:
    #             fileName = join(source, file)
    #             movedFile = join(destination, file)

    #             print("%s " % fileName)
    #             video = cv2.VideoCapture(fileName)
    #             fps = int(video.get(cv2.CAP_PROP_FPS))
    #             print("   %6.2f fps" % fps)

    #             # capture 1 frame per second
    #             count = 0
    #             success, frame = video.read()
    #             while success:
    #                 success, frame = video.read()

    #                 if count % fps == 0:
    #                     index = "-%#05d.jpg" % (count + 1)
    #                     outputFile = join(source, file.replace(extension, index))
    #                     cv2.imwrite(outputFile, frame)

    #                 count = count + 1

    #             video.release()

    #             if isfile(movedFile):
    #                 remove(movedFile)

    #             rename(fileName, movedFile)

    #         except:
    #             print("[processVideos] Unexpected error:", sys.exc_info()[0])
    #             raise

def handler(event, context):
    return fetch_frames(event, context)
