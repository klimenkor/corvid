# USAGE
# python deep_learning_object_detection.py --image images/example_01.jpg \
#	--prototxt MobileNetSSD_deploy.prototxt.txt --model MobileNetSSD_deploy.caffemodel

# import the necessary packages
import numpy as np
import argparse
import cv2
import time
import datetime as dt
from os import listdir
from os.path import isfile, join
from os import rename
from os import remove
import smtplib
from email.mime.multipart import MIMEMultipart


def sendEmail(recepient, message):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("klimenkor@gmail.com", "M3l1na030217!!")

    msg = MIMEMultipart()
    msg['From'] = "klimenkor@gmail.com"
    msg['To'] = recepient
    msg['Subject'] = message

    s.send_message(msg)
    del msg

    s.quit()


# construct the argument parse and parse the arguments
def initArguments():
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--in", required=True, help="folder with new images")
    ap.add_argument("-o", "--out", required=True, help="folder with processed images")
    ap.add_argument("-p", "--prototxt", required=True, help="path to Caffe 'deploy' prototxt file")
    ap.add_argument("-m", "--model", required=True, help="path to Caffe pre-trained model")
    ap.add_argument("-c", "--confidence", type=float, default=0.7, help="minimum probability to filter weak detections")
    return vars(ap.parse_args())


def findFiles(path, extension):
    return [f for f in listdir(path) if isfile(join(path, f)) and f.endswith(extension)]


def processFrames(source, destination, confidenceThreshold):
    processed = 0
    frames = findFiles(source, ".jpg")
    if len(frames) > 0:
        for frame in frames:
            fileName = join(source, frame)
            processedFile = join(destination, frame.replace(".", "-detected."))
            movedFile = join(destination, frame)
            # print("%s " % frame)

            image = cv2.imread(fileName)
            (h, w) = image.shape[:2]
            blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007843, (300, 300), 127.5)

            net.setInput(blob)
            detections = net.forward()
            objectsDetected = 0

            # loop over the detections
            for i in np.arange(0, detections.shape[2]):
                # extract the confidence (i.e., probability) associated with the
                # prediction
                confidence = detections[0, 0, i, 2]

                # filter out weak detections by ensuring the `confidence` is
                # greater than the minimum confidence
                if confidence > confidenceThreshold:
                    idx = int(detections[0, 0, i, 1])
                    box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                    (startX, startY, endX, endY) = box.astype("int")

                    # display the prediction
                    label = "   {}: {:.2f}%".format(CLASSES[idx], confidence * 100)
                    print("   {}".format(label))
                    sendEmail("3234592298@txt.att.net", label)
                    cv2.rectangle(image, (startX, startY), (endX, endY),
                                  COLORS[idx], 2)
                    y = startY - 15 if startY - 15 > 15 else startY + 15
                    cv2.putText(image, label, (startX, y),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLORS[idx], 2)
                    objectsDetected = objectsDetected + 1

            # if objectsDetected == 0:
            #     print("    NOTHING DETECTED")

            # timeElapsed = (dt.datetime.now() - timestamp1).microseconds / 1e6
            # print("   %6.2f sec" % timeElapsed)

            cv2.imwrite(processedFile, image)

            if isfile(movedFile):
                remove(movedFile)

            rename(fileName, movedFile)
            processed = processed + 1

    return processed


def processVideos(source, destination):
    processed = 0
    videos = findFiles(source, ".264")
    if len(videos) > 0:
        print("found ", videos)

        for file in videos:

            fileName = join(source, file)
            movedFile = join(destination, file)
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
                    index = "-%#05d.jpg" % (count + 1)
                    outputFile = join(source, file.replace(".264", index))
                    cv2.imwrite(outputFile, frame)

                count = count + 1

            video.release()

            if isfile(movedFile):
                remove(movedFile)

            rename(fileName, movedFile)

    return processed


###################################################


# initialize the list of class labels MobileNet SSD was trained to
# detect, then generate a set of bounding box colors for each class
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]
COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))

args = initArguments()

# load our serialized model from disk
timestamp1 = dt.datetime.now()
print("loading model...")
net = cv2.dnn.readNetFromCaffe(args["prototxt"], args["model"])

try:
    while True:
        processVideos(args["in"], args["out"])
        processFrames(args["in"], args["out"], args["confidence"])
        time.sleep(1)

except KeyboardInterrupt:
    print('terminated!')
