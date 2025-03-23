import os
import cv2
import time
import base64
import numpy as np
from datetime import datetime
from flask import jsonify, request, Blueprint

# Create a Blueprint for our object detection routes
object_detection_bp = Blueprint('object_detection', __name__)

# Global variables for model
model = None
output_layers = None
classes = []

def load_model():
    global model, output_layers, classes
    
    # Get model path
    model_path = os.path.dirname(os.path.abspath(__file__))
    
    # Load YOLO model
    try:
        model = cv2.dnn.readNet(
            os.path.join(model_path, "yolov3.weights"),
            os.path.join(model_path, "yolov3.cfg")
        )
        
        # Load class names
        classes_path = os.path.join(model_path, "coco.names")
        if os.path.exists(classes_path):
            with open(classes_path, "r") as f:
                classes = [line.strip() for line in f.readlines()]
        else:
            classes = ["object"] * 80  # Default if coco.names is not available
        
        layer_names = model.getLayerNames()
        output_layers = [layer_names[i - 1] for i in model.getUnconnectedOutLayers()]
        
        print("Object detection model loaded successfully")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

@object_detection_bp.route('/api/detect', methods=['POST'])
def detect_objects_api():
    # Check if model is loaded
    global model, output_layers, classes
    if model is None:
        if not load_model():
            return jsonify({'error': 'Failed to load detection model'}), 500
    
    # Get image from request
    try:
        # Expect base64 encoded image
        if 'image' not in request.json:
            return jsonify({'error': 'No image provided'}), 400
        
        image_data = request.json['image']
        # Remove data:image/jpeg;base64, prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode image
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'error': 'Invalid image data'}), 400
        
        # Process image
        height, width, _ = frame.shape
        
        # Pre-process frame for YOLO model
        blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), swapRB=True, crop=False)
        model.setInput(blob)
        outputs = model.forward(output_layers)
        
        # Lists to store detected info
        detected_objects = []
        
        for output in outputs:
            for detection in output:
                scores = detection[5:]
                class_id = int(scores.argmax())
                confidence = float(scores[class_id])
                
                if confidence > 0.5:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)
                    
                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)
                    
                    # Create object for detection
                    obj = {
                        'class': classes[class_id] if class_id < len(classes) else "Unknown",
                        'confidence': confidence,
                        'box': {
                            'x': x,
                            'y': y,
                            'width': w,
                            'height': h
                        }
                    }
                    detected_objects.append(obj)
        
        # Apply non-max suppression (could be done here if needed)
        
        # Return results
        return jsonify({
            'success': True,
            'detected_objects': detected_objects,
            'count': len(detected_objects)
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

@object_detection_bp.route('/api/camera_status', methods=['GET'])
def check_camera():
    try:
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return jsonify({'status': 'error', 'message': 'Camera not available'}), 404
        
        # Read a test frame
        ret, frame = cap.read()
        cap.release()
        
        if not ret:
            return jsonify({'status': 'error', 'message': 'Could not read from camera'}), 500
        
        return jsonify({'status': 'success', 'message': 'Camera is working properly'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'Error accessing camera: {str(e)}'}), 500

# Initialize the model when this module is imported
load_model()