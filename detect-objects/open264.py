import numpy as np
import cv2

cap = cv2.VideoCapture()
cwi=cap.open(r'images/test1.mp4')

counter = 0

while(cap.isOpened()):

    ret, frame = cap.read()

    counter += 1

    if counter % 30 == 0:
        cv2.imshow('frame', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()