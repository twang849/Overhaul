// ObjectDetection.js - Client-side code for SmartCart object detection

class SmartCartObjectDetector {
    constructor() {
        this.videoElement = null;
        this.canvasElement = null;
        this.captureButton = null;
        this.stream = null;
        this.detectedItems = [];
        this.isInitialized = false;
    }

    async initialize(videoElementId, canvasElementId, captureButtonId) {
        // Get DOM elements
        this.videoElement = document.getElementById(videoElementId);
        this.canvasElement = document.getElementById(canvasElementId);
        this.captureButton = document.getElementById(captureButtonId);
        
        if (!this.videoElement || !this.canvasElement) {
            console.error('Video or canvas element not found');
            return false;
        }

        try {
            // Check camera status first
            const statusResponse = await fetch('/api/camera_status');
            const statusData = await statusResponse.json();
            
            if (statusData.status !== 'success') {
                console.error('Camera not available:', statusData.message);
                return false;
            }
            
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'environment' // Prefer back camera for mobile
                } 
            });
            
            // Connect stream to video element
            this.videoElement.srcObject = this.stream;
            
            // Set up the capture button if provided
            if (this.captureButton) {
                this.captureButton.addEventListener('click', () => this.captureAndDetect());
            }
            
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Error initializing camera:', error);
            return false;
        }
    }

    // Capture current frame and detect objects
    async captureAndDetect() {
        if (!this.isInitialized) {
            console.error('Detector not initialized');
            return null;
        }
        
        try {
            // Draw current video frame to canvas
            const ctx = this.canvasElement.getContext('2d');
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
            ctx.drawImage(this.videoElement, 0, 0);
            
            // Get base64 image data
            const imageData = this.canvasElement.toDataURL('image/jpeg');
            
            // Send to detection API
            const response = await fetch('/api/detect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Store detected items
                this.detectedItems = result.detected_objects;
                
                // Draw bounding boxes
                this.drawDetections();
                
                // Return detected items
                return this.detectedItems;
            } else {
                console.error('Detection failed:', result.error);
                return null;
            }
        } catch (error) {
            console.error('Error in capture and detect:', error);
            return null;
        }
    }
    
    // Draw bounding boxes around detected objects
    drawDetections() {
        if (!this.canvasElement || this.detectedItems.length === 0) return;
        
        const ctx = this.canvasElement.getContext('2d');
        
        // Clear previous drawings (if needed)
        // ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        // Draw each detection
        this.detectedItems.forEach(item => {
            const { x, y, width, height } = item.box;
            
            // Box
            ctx.strokeStyle = '#0F0';  // Green
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
            
            // Label background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            const textWidth = ctx.measureText(`${item.class} ${Math.round(item.confidence * 100)}%`).width;
            ctx.fillRect(x, y - 30, textWidth + 10, 30);
            
            // Label text
            ctx.fillStyle = '#FFF';
            ctx.font = '18px Arial';
            ctx.fillText(
                `${item.class} ${Math.round(item.confidence * 100)}%`, 
                x + 5, 
                y - 10
            );
        });
    }
    
    // For auto-detection (e.g., running detection every second)
    startAutoDetection(intervalMs = 1000) {
        this.autoDetectionInterval = setInterval(() => {
            this.captureAndDetect();
        }, intervalMs);
    }
    
    stopAutoDetection() {
        if (this.autoDetectionInterval) {
            clearInterval(this.autoDetectionInterval);
        }
    }
    
    // Clean up resources
    stop() {
        this.stopAutoDetection();
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
    
    // Get the currently detected items
    getDetectedItems() {
        return this.detectedItems;
    }
    
    // Add an item to cart based on detection
    addToCart(itemIndex) {
        if (itemIndex >= 0 && itemIndex < this.detectedItems.length) {
            // This would typically call your cart service
            const item = this.detectedItems[itemIndex];
            console.log(`Added ${item.class} to cart`);
            return item;
        }
        return null;
    }
}

// Export for use in other modules
window.SmartCartObjectDetector = SmartCartObjectDetector;