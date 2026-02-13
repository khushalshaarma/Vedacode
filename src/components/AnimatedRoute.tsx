import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface AnimatedRouteProps {
  videoSrc: string;
  children: React.ReactNode;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ videoSrc, children }) => {
  const location = useLocation();
  const fromSignIn = location.state?.fromSignIn ?? false;

  const [showVideo, setShowVideo] = useState(fromSignIn); // only show video if coming from Sign-in

  useEffect(() => {
    if (fromSignIn) {
      const timer = setTimeout(() => setShowVideo(false), 4000); // hide video after 4s
      return () => clearTimeout(timer);
    }
  }, [fromSignIn]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      {showVideo && (
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Page Animation */}
      <AnimatePresence>
        {!showVideo && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedRoute;
