import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.6 }); // active when 60% visible

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {
          // ignore autoplay errors (like without user interaction)
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // restart when leaving
      }
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative h-screen w-full">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/myvideo.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Welcome to Video Section</h1>
      </div>
    </section>
  );
};

export default VideoSection;
