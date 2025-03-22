# ai/utils.py
import cv2

def load_yolo_model(weights_path="yolov3.weights", cfg_path="yolov3.cfg"):
    try:
        net = cv2.dnn.readNet(weights_path, cfg_path)
        print("YOLO model loaded successfully.")

        layer_names = net.getLayerNames()
        output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

        return net, output_layers
    except Exception as e:
        print(f"Error loading YOLO model: {e}")
        return None, None

def draw_bounding_box(frame, x, y, w, h, label="Object", color=(0, 255, 0)):
    cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
    cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

def preprocess_frame(frame, size=(416, 416)):
    return cv2.dnn.blobFromImage(frame, 0.00392, size, swapRB=True, crop=False)

if __name__ == "__main__":
    model, layers = load_yolo_model()
    if model:
        print("YOLO model is ready for use.")
