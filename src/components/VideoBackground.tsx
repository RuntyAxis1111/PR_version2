import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down the video for subtle background effect
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute top-[183px] w-full h-[calc(100%-183px)] object-cover opacity-5"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
