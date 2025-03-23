import { useState, useRef } from 'react';
import { detectObjects } from '../lib/api';

export default function ObjectDetection() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const response = await detectObjects(base64Image);
        setResults(response);
      } catch (error) {
        setError('Failed to detect objects. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Object Detection</h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        
        <button 
          onClick={() => fileInputRef.current.click()}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Upload Image for Detection'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {results && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold">Detection Results</h3>
          <p>Found {results.count} objects</p>
          
          {results.detected_objects.length > 0 ? (
            <ul className="list-disc pl-5 mt-2">
              {results.detected_objects.map((obj, index) => (
                <li key={index}>
                  {obj.class} - Confidence: {(obj.confidence * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          ) : (
            <p>No objects detected</p>
          )}
        </div>
      )}
    </div>
  );
}