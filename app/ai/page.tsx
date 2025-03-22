'use client'

import React, { useEffect, useRef, useState } from 'react';

const AiPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        };

        if (isCameraOn) {
            startCamera();
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [isCameraOn]);

    const toggleCamera = () => {
        setIsCameraOn(prevState => !prevState);
    };

    return (
        <div>
            <h1>AI Page</h1>
            <p>Welcome to the AI page!</p>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
            <button onClick={toggleCamera} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            </button>
        </div>
    );
};

export default AiPage;