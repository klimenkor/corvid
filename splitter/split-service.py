import numpy as np
import argparse
import cv2
import time
import sys
import datetime as dt
from os import listdir
from os.path import isfile, join
import boto3
from os import rename
from os import remove
import smtplib

import os


def fileIsReady(file):
    if os.path.exists(file):
        try:
            os.rename(file, file)
            return True
        except:
            return False

# construct the argument parse and parse the arguments
def initArguments():
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--in", required=True, help="folder with new images")
    # ap.add_argument("-o", "--out", required=True, help="folder with processed images")
    # ap.add_argument("-p", "--prototxt", required=True, help="path to Caffe 'deploy' prototxt file")
    # ap.add_argument("-m", "--model", required=True, help="path to Caffe pre-trained model")
    # ap.add_argument("-c", "--confidence", type=float, default=0.7, help="minimum probability to filter weak detections")
    return vars(ap.parse_args())


def findFiles(path, extension):
    return [f for f in listdir(path) if isfile(join(path, f)) and f.endswith(extension)]

def get_frames(fileName,extension):

    frames = []
    # if fileIsReady(fileName):
    try:

        print("%s " % fileName)
        video = cv2.VideoCapture(fileName)
        fps = int(video.get(cv2.CAP_PROP_FPS))
        print("   %6.2f fps" % fps)

        # capture 1 frame per second
        count = 0
        success, frame = video.read()
        while success:
            success, frame = video.read()

            if count % fps == 0:
                suffix = "-%#05d.jpg" % (count + 1)
                outputFile = fileName.replace(extension, suffix)
                cv2.imwrite(outputFile, frame)
                np.append(frames, outputFile)
                print(outputFile)
            count = count + 1

        video.release()

    except:
        print("[processVideos] Unexpected error:", sys.exc_info()[0])
        raise

    return frames

def upload_frames(files,bucket,prefix):
    s3 = boto3.client('s3')
    for file in files:
        key = "%s/%s" % (prefix, file)
        print("uploading to %s %s" % (bucket, key))
        s3.upload_file(file, bucket, key)                                
    
def process_videos(source, extension):
    processed = 0
    videos = findFiles(source, extension)
    
    if len(videos) > 0:
        print("found ", videos)

        for file in videos:
            fileName = join(source, file)
            frames = get_frames (file,extension)
            print(frames)
            upload_frames(frames,"ecorvid","frames")


###################################################

args = initArguments()

# load our serialized model from disk
timestamp1 = dt.datetime.now()

print("waiting for incoming files...")

try:
    # while True:

        process_videos(args["in"], ".264")
        time.sleep(1)

except KeyboardInterrupt:
    print('terminated!')
