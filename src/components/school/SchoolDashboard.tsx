"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";

import WorkshopRequestForm from "./WorkshopRequestForm";
import UpcomingSessions from "./UpcomingSessions";
import PastSessions from "./PastSessions";
import FeedbackModal from "./FeedbackModal";
import { Button } from "../../components/ui/button";
import SchoolList from "../../components/SchoolList";
import TopicNotifications from "../../components/school/TopicNotifications";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { MessageCircle, X, Sun, Moon } from "lucide-react";
import Chatbot3DModel from "../../components/Chatbot3DModel";

const SchoolDashboard: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [feedbackSession, setFeedbackSession] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // ----- Send message -----
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setBotTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting AI." }]);
    } finally {
      setBotTyping(false);
    }
  };

  // ----- GSAP Animations + Tilt -----
  const headerRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const schoolInfoRef = useRef<HTMLDivElement | null>(null);
  const upcomingRef = useRef<HTMLDivElement | null>(null);
  const pastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, { opacity: 0, y: -50, scale: 0.95, duration: 1.2, ease: "power3.out" });
    }

    if (buttonsRef.current) {
      const btns = buttonsRef.current.querySelectorAll("button");
      btns.forEach((btn) => {
        btn.addEventListener("mouseenter", () =>
          gsap.to(btn, {
            scale: 1.1,
            textShadow: "0px 0px 12px rgba(255,255,255,0.6)",
            boxShadow: "0 0 20px rgba(0,255,255,0.3)",
            duration: 0.3,
          })
        );
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, {
            scale: 1,
            textShadow: "0px 0px 0px rgba(0,0,0,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.3,
          })
        );
      });
    }

    if (schoolInfoRef.current) {
      gsap.from(schoolInfoRef.current, { opacity: 0, y: 40, duration: 1, ease: "back.out(1.7)" });
      const onTilt = (e: MouseEvent) => {
        const rect = schoolInfoRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        gsap.to(schoolInfoRef.current, { rotateY: x, rotateX: y, duration: 0.6, ease: "power2.out" });
      };
      schoolInfoRef.current.addEventListener("mousemove", onTilt);
      return () => schoolInfoRef.current?.removeEventListener("mousemove", onTilt);
    }
  }, []);

  useEffect(() => {
    if (upcomingRef.current) {
      gsap.from(upcomingRef.current.children, { opacity: 0, y: 40, stagger: 0.15, duration: 0.7, ease: "power3.out" });
    }
    if (pastRef.current) {
      gsap.from(pastRef.current.children, { opacity: 0, y: 40, stagger: 0.15, duration: 0.7, ease: "power3.out" });
    }
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} relative min-h-screen p-6 space-y-8 transition-colors duration-500`}>
      
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          className="p-3 rounded-full shadow-lg hover:shadow-2xl bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition-colors duration-300"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className={`flex items-center justify-between p-6 rounded-3xl shadow-2xl transform hover:scale-102 transition-transform duration-500 ${
          darkMode ? "bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 text-white" : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold">🎓 School Dashboard</h1>
        <div ref={buttonsRef} className="flex gap-4">
          <Button className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-2xl transition">
            📹 Live Meeting
          </Button>
          <Button className="bg-white text-purple-700 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-2xl transition" onClick={() => setShowRequestForm(true)}>
            Request New Workshop
          </Button>
        </div>
      </div>

      {/* Topic Notifications Card */}
      <div className={`p-5 rounded-2xl shadow-xl border hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-md ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}>
        <TopicNotifications />
      </div>



{/* School Info Card - KEEP ORIGINAL COLORS */}
<div
  ref={schoolInfoRef}
  className="p-6 rounded-2xl shadow-2xl border hover:shadow-3xl transition-transform transform hover:-translate-y-1 backdrop-blur-md bg-white border-gray-300 text-gray-900"
>
  <h2 className="text-2xl font-semibold mb-4">{`🏫 School Information`}</h2>
  <SchoolList />
</div>

{/* Upcoming Sessions */}
<div
  ref={upcomingRef}
  className={`space-y-4 p-5 rounded-2xl shadow-xl border hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-md ${
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
  }`}
>
  <UpcomingSessions onFeedback={(id: string) => console.log("Pre-session note for", id)} darkMode={darkMode} />
</div>

{/* Past Sessions */}
<div
  ref={pastRef}
  className={`space-y-4 p-5 rounded-2xl shadow-xl border hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-md ${
    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
  }`}
>
  <PastSessions onFeedback={(id: string) => setFeedbackSession(id)} darkMode={darkMode} />
</div>



      {/* Modals */}
      {showRequestForm && <WorkshopRequestForm open={showRequestForm} onClose={() => setShowRequestForm(false)} />}
      {feedbackSession && <FeedbackModal open={!!feedbackSession} sessionId={feedbackSession} onClose={() => setFeedbackSession(null)} />}

      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen && (
          <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-transform duration-300" onClick={() => setChatOpen(true)}>
            <MessageCircle size={28} />
          </button>
        )}
      </div>

      {/* Chatbot Fullscreen */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col">
          <Chatbot3DModel />
          <div className="absolute inset-0 flex flex-col z-10">
            <div className={`p-4 flex justify-between items-center shadow-lg ${darkMode ? "bg-blue-800 text-white" : "bg-blue-400 text-gray-900"}`}>
              <h2 className="text-xl font-semibold">Chatbot</h2>
              <button onClick={() => setChatOpen(false)} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className={`flex-1 p-6 overflow-y-auto flex flex-col gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? darkMode
                        ? "self-end bg-blue-500 text-white"
                        : "self-end bg-blue-300 text-gray-900"
                      : darkMode
                      ? "self-start bg-gray-700 text-white"
                      : "self-start bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {botTyping && <div className="self-start px-3 py-1 rounded-lg bg-gray-700 text-white">Bot is typing...</div>}
            </div>

            <div className={`p-4 border-t flex justify-center ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
              <div className="flex items-center w-[420px] max-w-full border rounded-full px-4 py-2 shadow-lg">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className={`flex-grow bg-transparent outline-none px-2 min-w-0 ${darkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button className="ml-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolDashboard;
