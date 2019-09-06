import numpy as np
import cv2
import sys
from os.path import isfile, join
from os import rename
from os import remove
import time
import asyncio
import os, glob

base_folder = 'media'
folder_raw = 'raw'
folder_archive = 'archive'
folder_frames = 'frames'
folder_objects = 'objects'
confidence = 90

proto_txt = "MobileNetSSD/MobileNetSSD_deploy.prototxt"
model = "MobileNetSSD/MobileNetSSD_deploy.caffemodel"


def file_is_ready(file):
    if os.path.exists(file):
        try:
            os.rename(file, file)
            return True
        except OSError as e:
            return False


def get_ordered_files(path):
    files = glob.glob(path + '/*.*')
    files.sort(key=os.path.getmtime)
    return files


def process_frames(source, destination, confidence_threshold):
    processed = 0
    files = get_ordered_files(source)
    if len(files) > 0:
        for file in files:
            try:
                # file_name = framejoin(source, frame)
                processed_file = join(destination, file.replace(".", "-detected."))
                moved_file = file.replace(folder_frames,folder_objects)
                print("    frame %s " % file)

                image = cv2.imread(file)
                (h, w) = image.shape[:2]
                blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 0.007843, (300, 300), 127.5)

                net.setInput(blob)
                detections = net.forward()
                objects_detected = 0

                # loop over the detections
                for i in np.arange(0, detections.shape[2]):
                    # extract the confidence (i.e., probability) associated with the
                    # prediction
                    actual_confidence = detections[0, 0, i, 2]

                    # filter out weak detections by ensuring the `confidence` is
                    # greater than the minimum confidence
                    if actual_confidence > confidence_threshold:
                        idx = int(detections[0, 0, i, 1])
                        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                        (startX, startY, endX, endY) = box.astype("int")

                        # display the prediction
                        label = "   {}: {:.2f}%".format(CLASSES[idx], confidence * 100)
                        print("   {}".format(label))
                        # sendEmail(email, label)
                        cv2.rectangle(image, (startX, startY), (endX, endY),
                                      COLORS[idx], 2)
                        y = startY - 15 if startY - 15 > 15 else startY + 15
                        cv2.putText(image, label, (startX, y),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, COLORS[idx], 2)
                        objects_detected = objects_detected + 1

                cv2.imwrite(processed_file, image)

                if isfile(moved_file):
                    remove(moved_file)

                rename(file, moved_file)
                processed = processed + 1

            except:
                print("[processFrames]: Unexpected error:", sys.exc_info()[0])
                raise

    return processed


async def process_videos(source, destination, extension) -> object:
    processed = 0
    # videos = findFiles(source, extension)
    files = get_ordered_files(source)

    if len(files) > 0:
        print("found ", files)

        for file in files:

            try:
                # file_name = join(source, file)
                moved_file = file.replace(folder_raw, folder_archive)

                if file_is_ready(file):
                    print("%s " % file)
                    video = cv2.VideoCapture(file)
                    fps = int(video.get(cv2.CAP_PROP_FPS))
                    print("   %6.2f fps" % fps)

                    # capture 1 frame per second
                    count = 0
                    # frame_loop = asyncio.get_event_loop()
                    start = time.process_time()
                    success, frame = video.read()
                    while success:
                        success, frame = video.read()

                        if count % fps == 0:
                            index = "-%#05d.jpg" % (count + 1)
                            output_file = file.replace(folder_raw,folder_frames).replace(extension, index)
                            # save_frame = frame_loop.create_task(
                            cv2.imwrite(output_file, frame)
                            # frame_loop..run_until_complete(
                        count = count + 1

                    video.release()
                    end = time.process_time() - start
                    # frame_loop.close()
                    print("    % d frames in %.2f seconds" % (count/fps, end - start))
                    if isfile(moved_file):
                        remove(moved_file)

                    rename(file, moved_file)
            except:
                print("[processVideos] Unexpected error:", sys.exc_info()[0])
                raise

    return processed



# initialize the list of class labels MobileNet SSD was trained to
# detect, then generate a set of bounding box colors for each class
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]
COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))

print("loading model...")
net = cv2.dnn.readNetFromCaffe(proto_txt, model)

print("waiting for files...")

main_loop = asyncio.get_event_loop()
while True:
    try:
        # process_videos(join(base_folder, folder_raw), join(base_folder, folder_frames), ".mp4")
        task_videos = main_loop.create_task(process_videos(join(base_folder, folder_raw),
                                                           join(base_folder, folder_frames), ".264"))

        # task_frames = main_loop.create_task(process_frames(join(base_folder, folder_frames),
        #                                                    join(base_folder, folder_objects), confidence))

        main_loop.run_until_complete(task_videos)
        # main_loop.run_until_complete(task_frames)

    except KeyboardInterrupt:
        print('terminated!')
    # finally:

main_loop.close()
