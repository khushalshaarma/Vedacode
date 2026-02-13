// src/lib/webrtc.ts
import { socket } from "./socket";

let pc: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;

/**
 * Initialize WebRTC connection inside a given room.
 */
export async function initWebRTC(
  roomId: string,
  localVideo: HTMLVideoElement,
  remoteVideo: HTMLVideoElement
) {
  if (pc) {
    console.warn("WebRTC already initialized");
    return;
  }

  // 1. Create peer connection with STUN
// 1. Create peer connection with STUN
pc = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },  // STUN
    {
      urls: "turn:relay1.expressturn.com:3478",
      username: "efree",
      credential: "efree",
    },
  ],
});

// ✅ Add connection state logs for debugging
pc.oniceconnectionstatechange = () => {
  console.log("ICE state:", pc?.iceConnectionState);
};

pc.onconnectionstatechange = () => {
  console.log("Peer connection state:", pc?.connectionState);
};



  // 2. Handle ICE candidates
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("ice-candidate", {
        candidate: event.candidate,
        roomId,
      });
    }
  };

  //
pc.ontrack = (event) => {
  if (remoteVideo) {
    remoteVideo.srcObject = event.streams[0];
    remoteVideo.autoplay = true;       // ✅ ensures autoplay
    remoteVideo.playsInline = true;    // ✅ required for iPhone Safari
  }
};


  // 4. Get local media (camera + mic)
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localStream.getTracks().forEach((track) => pc!.addTrack(track, localStream!));
  if (localVideo) {
    localVideo.srcObject = localStream;
  }

  // 5. Join room
  socket.emit("join-room", roomId);

  // 6. Handle new user joining
  socket.on("user-joined", async () => {
    if (!pc) return;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("offer", { offer, roomId });
  });

  // 7. Handle offer
  socket.on("offer", async (data: { offer: RTCSessionDescriptionInit }) => {
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer", { answer, roomId });
  });

  // 8. Handle answer
  socket.on("answer", async (data: { answer: RTCSessionDescriptionInit }) => {
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
  });

  // 9. Handle ICE candidate
  socket.on("ice-candidate", async (data: { candidate: RTCIceCandidateInit }) => {
    try {
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } catch (err) {
      console.error("Error adding ICE candidate:", err);
    }
  });
}

/**
 * Cleanup WebRTC and release resources
 */
export function cleanupWebRTC() {
  if (pc) {
    pc.close();
    pc = null;
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }

  socket.removeAllListeners("user-joined");
  socket.removeAllListeners("offer");
  socket.removeAllListeners("answer");
  socket.removeAllListeners("ice-candidate");
}
