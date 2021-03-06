import numpy as np
import numpy as np
from numpy import array
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
    ap.add_argument("-e", "--extension", required=True, help="extension of video file")
    ap.add_argument("-b", "--bucket", required=True, help="bucket for frames")
    ap.add_argument("-p", "--prefix", required=True, help="prefix for frames")
    ap.add_argument("-t", "--prototxt", required=True, help="prototxt file")
    ap.add_argument("-m", "--model", required=True, help="model file")
    ap.add_argument("-w", "--wait", required=True, help="wait time between checks (sec)")
    return vars(ap.parse_args())


def findFiles(path, extension):
    return [f for f in listdir(path) if isfile(join(path, f)) and f.endswith(extension)]

def get_frames(fileName,extension,confidenceThreshold):

    frames = []
    try:

        print("%s " % fileName)
        video = cv2.VideoCapture(fileName)
        fps = int(video.get(cv2.CAP_PROP_FPS))
        print("   %6.2f fps" % fps)

        # capture 1 frame per second
        count = 0
        index = 0
        ts = time.time()
        success, frame = video.read()
        while success:
            if count % fps == 0:
                print("frame %d >>" %(count))

                found_objects = detect_objects(frame, confidenceThreshold)
                if len(found_objects) > 0 :
                    index = index + 1
                    suffix = "-%#05d.jpg" % index
                    outputFile = fileName.replace(".%s" % extension, suffix)
                    cv2.imwrite(outputFile, frame)#, [int(cv2.IMWRITE_JPEG_QUALITY), 70])
                    # frames.append(outputFile)
                    frames.append([outputFile, found_objects])
                    print("%s %s" % (outputFile,found_objects))
            count = count + fps
            try:
                success = video.set(cv2.CAP_PROP_POS_FRAMES,count)
                if success:
                    success, frame = video.read()

            except cv2.error as e:
                print("cv2.error:", e)
            except Exception as e:
                print("Exception:", e)

        video.release()
        if index > 0:
            print ("average time per frame %6.2f sec" % ((time.time() - ts) / index))

    except:
        print("[processVideos] Unexpected error:", sys.exc_info()[0])
        raise

    return frames

def detect_objects(image,confidenceThreshold):
    CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
               "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
               "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
               "sofa", "train", "tvmonitor"]

    (h, w) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007843, (300, 300), 127.5)

    net.setInput(blob)
    detections = net.forward()
    objects_detected = 0
    label = ""

    # loop over the detections
    for i in np.arange(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        if confidence > confidenceThreshold:
            idx = int(detections[0, 0, i, 1])
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            label = label + "{}:{:.2f}% ".format(CLASSES[idx], confidence * 100)
            objects_detected = objects_detected + 1

    if objects_detected > 0:
        return label

    return ""

#
# def get_frames_with_objects(frames,confidenceThreshold):
#     CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
#                "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
#                "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
#                "sofa", "train", "tvmonitor"]
#
#     images = []
#     for file in frames:
#         try:
#             image = cv2.imread(file)
#             (h, w) = image.shape[:2]
#             blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007843, (300, 300), 127.5)
#
#             net.setInput(blob)
#             detections = net.forward()
#             objects_detected = 0
#             label = ""
#
#             # loop over the detections
#             for i in np.arange(0, detections.shape[2]):
#                 confidence = detections[0, 0, i, 2]
#
#                 if confidence > confidenceThreshold:
#                     idx = int(detections[0, 0, i, 1])
#                     box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
#                     (startX, startY, endX, endY) = box.astype("int")
#
#                     label = label + "{}: {:.2f}% ; ".format(CLASSES[idx], confidence * 100)
#                     objects_detected = objects_detected + 1
#
#             if objects_detected>0 :
#                 images.append([file,label])
#
#         except:
#             print("[processFrames]: Unexpected error:", sys.exc_info()[0])
#             raise
#
#     return images

def upload_frames(files,source,bucket,prefix):
    s3 = boto3.client('s3')
    for file in files:
        key = "%s/%s" % (prefix, file.replace(source,''))
        print("uploading %s to %s %s" % (file,bucket, key))
        s3.upload_file(file, bucket, key)

def cleanup_frames(files):
    for file in files:
        os.remove(file)

def archive_video(file,sourceFolder,destinationBucket,destinationPrefix):
    s3 = boto3.client('s3')
    sourceFile = os.path.join(sourceFolder,file)
    key = "%s/%s" % (destinationPrefix, file.replace(sourceFolder, ''))
    print("uploading %s to %s %s" % (sourceFile, destinationBucket, key))
    s3.upload_file(sourceFile, destinationBucket, key)

def cleanup_video(file,sourceFolder):
    s3 = boto3.client('s3')
    sourceFile = os.path.join(sourceFolder,file)
    os.remove(sourceFile)

###################################################

args = initArguments()

sourceFolder = args["in"]
sourceExtension = args["extension"]
framesBucket = args["bucket"]
framesPrefix = args["prefix"]
protoTxt = args["prototxt"]
model = args["model"]
videosBucket = args["bucket"]
videosPrefix = "archive"
waitSeconds = int(args["wait"])
confidenceThreshold = 0.6

print("loading caffe model...")
net = cv2.dnn.readNetFromCaffe(protoTxt, model)

try:
    while True:
        videos = findFiles(sourceFolder, sourceExtension)

        if len(videos) > 0:
            ts = time.time()
            for file in videos:
                print("processing %s " % (file))
                images_with_objects = get_frames("%s%s" % (sourceFolder, file), sourceExtension, confidenceThreshold)
                # images_with_objects = get_frames_with_objects(images,0.6)
                if len(images_with_objects) > 0:
                    findings = array(images_with_objects)[:,1:].flatten()
                    images_to_upload = array(images_with_objects)[:,:1].flatten()
                    upload_frames(images_to_upload, sourceFolder, framesBucket, framesPrefix)
                    # archive_video(file)
                    cleanup_frames(images_to_upload)
                    cleanup_video(file, sourceFolder)
            print("Spent %6.2f sec" % (time.time() - ts))
        st = dt.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
        print("%s waiting for incoming files..." % (st))
        time.sleep(waitSeconds)

except KeyboardInterrupt:
    print('terminated!')
