// src/pages/MeetingRoom.tsx
import React, { useEffect, useRef, useState } from "react";
import { initWebRTC } from "../lib/webrtc";
import { socket } from "../lib/socket";

const MeetingRoom: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);

  useEffect(() => {
    if (!joined || !roomId) return;

    // Initialize WebRTC when user joins
    if (localVideoRef.current && remoteVideoRef.current) {
      initWebRTC(roomId, localVideoRef.current, remoteVideoRef.current);
    }

    // Cleanup socket listeners when leaving
    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-joined");
    };
  }, [joined, roomId]);

  const handleJoin = () => {
    if (!roomId) return alert("Please enter a room ID");
    setJoined(true);
    socket.emit("join-room", roomId);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/img3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-white drop-shadow mb-10">
          Real-Time Meeting
        </h1>

        {!joined ? (
          <div className="backdrop-blur-md bg-white/20 border border-white/40 shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-white mb-6 drop-shadow">
              Enter Meeting ID
            </h2>
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 placeholder-gray-600"
            />
            <button
              onClick={handleJoin}
              className="w-full px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-orange-600 transition-all shadow-lg"
            >
              🚀 Join Room
            </button>
          </div>
        ) : (
          <div className="flex gap-8 mt-6 flex-wrap justify-center">
            <div className="p-2 backdrop-blur-sm bg-white/30 shadow-lg rounded-xl">
              <p className="text-center text-sm font-medium text-white">You</p>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-72 h-52 bg-black rounded-lg"
              />
            </div>
            <div className="p-2 backdrop-blur-sm bg-white/30 shadow-lg rounded-xl">
              <p className="text-center text-sm font-medium text-white">
                Participant
              </p>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-72 h-52 bg-black rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;
