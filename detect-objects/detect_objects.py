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

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-n", "--in", required=True,
                help="folder with new images")
ap.add_argument("-o", "--out", required=True,
                help="folder with processed images")
ap.add_argument("-p", "--prototxt", required=True,
                help="path to Caffe 'deploy' prototxt file")
ap.add_argument("-m", "--model", required=True,
                help="path to Caffe pre-trained model")
ap.add_argument("-c", "--confidence", type=float, default=0.2,
                help="minimum probability to filter weak detections")
args = vars(ap.parse_args())

# initialize the list of class labels MobileNet SSD was trained to
# detect, then generate a set of bounding box colors for each class
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]
COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))

# load our serialized model from disk
timestamp1 = dt.datetime.now()
print("loading model...")
net = cv2.dnn.readNetFromCaffe(args["prototxt"], args["model"])

try:
    while True:
        onlyFiles = [f for f in listdir(args["in"]) if isfile(join(args["in"], f))]
        for file in onlyFiles:

            fileName = join(args["in"], file)
            processedFile = join(args["out"], file.replace(".", "-detected."))
            movedFile = join(args["out"], file)
            print("%s " % fileName)

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
                if confidence > args["confidence"]:
                    # extract the index of the class label from the `detections`,
                    # then compute the (x, y)-coordinates of the bounding box for
                    # the object
                    idx = int(detections[0, 0, i, 1])
                    box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                    (startX, startY, endX, endY) = box.astype("int")

                    # display the prediction
                    label = "   {}: {:.2f}%".format(CLASSES[idx], confidence * 100)
                    print("   {}".format(label))
                    cv2.rectangle(image, (startX, startY), (endX, endY),
                                  COLORS[idx], 2)
                    y = startY - 15 if startY - 15 > 15 else startY + 15
                    cv2.putText(image, label, (startX, y),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLORS[idx], 2)
                    objectsDetected = objectsDetected + 1

            if objectsDetected == 0:
                print("    NOTHING DETECTED")

            timeElapsed = (dt.datetime.now() - timestamp1).microseconds / 1e6
            print("   %6.2f sec" % timeElapsed)

            cv2.imwrite(processedFile, image)
            remove(movedFile)
            rename(fileName,movedFile)

        time.sleep(1)

except KeyboardInterrupt:
    print('termintated!')