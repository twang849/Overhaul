'use client'

import React, { useEffect, useRef } from 'react';

const AiPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

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

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <h1>AI Page</h1>
            <p>Welcome to the AI page!</p>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
        </div>
    );
};

export default AiPage;