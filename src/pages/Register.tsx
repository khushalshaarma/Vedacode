import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignIn = location.state?.fromSignIn ?? false;

  const [animate, setAnimate] = useState(fromSignIn);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVideo, setShowVideo] = useState(true); // ✅ play video first

  useEffect(() => {
    if (fromSignIn) {
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [fromSignIn]);

  useEffect(() => {
    // ⏳ Show video for 3 seconds, then switch to background
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const user = { fullName, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* 🔹 Show Intro Video */}
      {showVideo ? (
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/register-intro.mp4" type="video/mp4" />
        </video>
      ) : (
        <>
          {/* 🔹 Show Background Image after video */}
          <img
            src="/videos/img23.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 opacity-100"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </>
      )}

      {/* 🔹 Register Card */}
      {!showVideo && (
        <div
  className="relative z-10 bg-black/70 p-10 rounded-2xl shadow-xl w-full max-w-md text-center 
             border-2 border-white 
             shadow-[0_0_25px_rgba(255,255,255,0.7)] 
             hover:shadow-[0_0_35px_rgba(255,255,255,1)] 
             transition-all duration-300 
             -translate-y-28"
>
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 
                         text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 
                         text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 
                         text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

           <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white 
                       bg-[#8e5118] shadow-lg 
                       border-2 border-[#8e5118] 
                       transition-all duration-300 
                       hover:shadow-[0_0_20px_4px_rgba(142,81,24,0.9)] 
                       hover:border-[#a15c20] 
                       hover:bg-[#000000] 
                       hover:scale-105"
          >
            Register
          </button>
          </form>

          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-300 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
