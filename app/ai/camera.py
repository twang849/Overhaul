# ai/camera.py
import cv2

def capture_frame():
    cap = cv2.VideoCapture(0)  # Open the default camera

    if not cap.isOpened():
        print("Error: Could not open camera.")
        return None

    ret, frame = cap.read()

    if not ret:
        print("Error: Failed to capture frame.")
        return None

    cap.release()
    return frame

def save_frame(frame, filename="capture.jpg"):
    cv2.imwrite(filename, frame)
    print(f"Frame saved as {filename}")

if __name__ == "__main__":
    frame = capture_frame()
    if frame is not None:
        save_frame(frame)