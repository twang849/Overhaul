'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

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
        <div className="min-h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to the SmartCart AI Experience 🛒🤖</h1>
                    <p className="text-xl text-white/80">Using the power of AI ⚡, our system quickly scans your items 📦 and adds them to your checkout menu 🛍️, making the process fast 🚀, accessible, and totally hassle free and hands free. Experience a smooth, modern way to shop that's designed with you in mind 🧘.</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                    <div className="relative aspect-video mb-6 overflow-hidden rounded-xl bg-black/20">
                        {!isCameraOn && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-white/60 text-lg">Camera is currently off</p>
                            </div>
                        )}
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="flex justify-center">
                        <Button
                            onClick={toggleCamera}
                            className={`px-6 py-3 text-lg transition-all duration-300 ${
                                isCameraOn 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-emerald-500 hover:bg-emerald-600'
                            }`}
                        >
                            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiPage;