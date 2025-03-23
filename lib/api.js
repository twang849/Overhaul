export async function detectObjects(imageBase64) {
    try {
      const response = await fetch('http://localhost:5000/api/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });
      
      if (!response.ok) {
        throw new Error('Detection failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error detecting objects:', error);
      throw error;
    }
  }
  
  export async function checkCameraStatus() {
    try {
      const response = await fetch('http://localhost:5000/api/camera_status');
      return await response.json();
    } catch (error) {
      console.error('Error checking camera:', error);
      throw error;
    }
  }