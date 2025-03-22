import os
import cv2
import time
from datetime import datetime

def detect_objects(save_dir="detected_frames", save_interval=2):
    # Create directory for saving frames if it doesn't exist
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
        
    # Get current directory
    model_path = os.path.dirname(os.path.abspath(__file__))

    # Load YOLO model
    net = cv2.dnn.readNet(
        os.path.join(model_path, "yolov3.weights"),
        os.path.join(model_path, "yolov3.cfg")
    )

    # Load class names (assuming you have a coco.names file, if not you should download it)
    classes_path = os.path.join(model_path, "coco.names")
    if os.path.exists(classes_path):
        with open(classes_path, "r") as f:
            classes = [line.strip() for line in f.readlines()]
    else:
        classes = ["object"] * 80  # Default if coco.names is not available
    
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

    # Capture video from the camera
    cap = cv2.VideoCapture(0)
    
    # Optional: create a video writer
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter(os.path.join(save_dir, 'detection_output.avi'), 
                          fourcc, 20.0, (frame_width, frame_height))

    last_save_time = time.time()
    frame_count = 0

    print("Starting object detection. Press Ctrl+C to stop.")
    
    try:
        while True:
            ret, frame = cap.read()

            if not ret:
                print("Failed to grab frame")
                break

            height, width, _ = frame.shape

            # Pre-process frame for YOLO model
            blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), swapRB=True, crop=False)
            net.setInput(blob)
            outputs = net.forward(output_layers)

            # Lists to store detected info
            class_ids = []
            confidences = []
            boxes = []
            
            for output in outputs:
                for detection in output:
                    scores = detection[5:]
                    class_id = int(scores.argmax())
                    confidence = scores[class_id]

                    if confidence > 0.5:
                        center_x = int(detection[0] * width)
                        center_y = int(detection[1] * height)
                        w = int(detection[2] * width)
                        h = int(detection[3] * height)

                        x = int(center_x - w / 2)
                        y = int(center_y - h / 2)

                        # Store detection results
                        class_ids.append(class_id)
                        confidences.append(float(confidence))
                        boxes.append([x, y, w, h])

            # Apply non-max suppression to avoid multiple detections of the same object
            indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
            
            # Draw bounding boxes for detected objects
            for i in range(len(boxes)):
                if i in indexes:
                    x, y, w, h = boxes[i]
                    label = str(classes[class_ids[i]]) if class_ids[i] < len(classes) else "Unknown"
                    confidence_text = f"{label}: {confidences[i]:.2f}"
                    
                    # Draw bounding box
                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    # Put text
                    cv2.putText(frame, confidence_text, (x, y - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # Write to video file
            out.write(frame)
            
            # Save frame at intervals
            current_time = time.time()
            if current_time - last_save_time > save_interval:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                frame_path = os.path.join(save_dir, f"detection_{timestamp}.jpg")
                cv2.imwrite(frame_path, frame)
                print(f"Frame saved: {frame_path}")
                last_save_time = current_time
            
            frame_count += 1
            if frame_count % 10 == 0:
                print(f"Processed {frame_count} frames")
                
            # Replace the GUI wait with a short sleep
            time.sleep(0.05)  # 50ms delay
            
    except KeyboardInterrupt:
        print("Detection stopped by user")
    finally:
        cap.release()
        out.release()
        print("Resources released. Object detection complete.")

if __name__ == "__main__":
    detect_objects()