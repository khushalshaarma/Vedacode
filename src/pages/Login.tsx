import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("registeredUser") || "{}");

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleGoToRegister = () => {
    navigate("/register", { state: { fromSignIn: true } });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/videos/img23.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login card */}
      <div
        className="relative z-10 bg-black/70 p-10 rounded-2xl shadow-xl w-full max-w-md text-center 
                   border-2 border-white 
                   shadow-[0_0_25px_rgba(255,255,255,0.7)] 
                   hover:shadow-[0_0_35px_rgba(255,255,255,1)] 
                   transition-all duration-300 
                   -translate-y-28"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 
                       border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 
                       border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Sign In button */}
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
            Sign In
          </button>
        </form>

        <p className="mt-5 text-gray-200">
          Don’t have an account?{" "}
          <span
            onClick={handleGoToRegister}
            className="text-yellow-300 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
