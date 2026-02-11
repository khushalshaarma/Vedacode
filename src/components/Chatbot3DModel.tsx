"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { socket } from "../lib/socket";

interface Message {
  user?: string;
  bot?: string;
}

// --- Robot Model ---
function Robot() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} scale={2.7} position={[0, -1, 0]} />;
}

// --- Space Background ---
function SpaceBackground() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/need_some_space.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0005;
      group.current.rotation.x += 0.0002;
    }
  });

  return <primitive ref={group} object={scene} scale={6} position={[0, -3, -10]} />;
}

// --- Stars ---
function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const starPositions = useRef(
    new Float32Array(
      Array.from({ length: 3000 }, () => [
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      ]).flat()
    )
  );

  useFrame(() => {
    if (pointsRef.current) pointsRef.current.rotation.y += 0.0002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.current.length / 3}
          array={starPositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.1} sizeAttenuation />
    </points>
  );
}

// --- Shooting Stars ---
function ShootingStars() {
  const group = useRef<THREE.Group>(null);
  const shootingStars = useRef<any[]>([]);

  useEffect(() => {
    const spawnStar = () => {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: "white" })
      );
      star.position.set((Math.random() - 0.5) * 50, Math.random() * 20 + 10, (Math.random() - 0.5) * 50);
      star.userData.velocity = new THREE.Vector3(
        -(Math.random() * 0.3 + 0.05),
        -(Math.random() * 0.3 + 0.05),
        Math.random() * 0.1 - 0.05
      );
      group.current?.add(star);
      shootingStars.current.push(star);

      setTimeout(() => {
        group.current?.remove(star);
        shootingStars.current = shootingStars.current.filter((s) => s !== star);
      }, 3000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) spawnStar();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    shootingStars.current.forEach((star) => star.position.add(star.userData.velocity));
  });

  return <group ref={group} />;
}

// --- Fly Controls ---
function FlyControls() {
  const vel = useRef(new THREE.Vector3());
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const onKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    const speed = keys.current["ShiftLeft"] ? 10 : 3;
    vel.current.set(0, 0, 0);
    if (keys.current["KeyW"]) vel.current.z -= speed * delta;
    if (keys.current["KeyS"]) vel.current.z += speed * delta;
    if (keys.current["KeyA"]) vel.current.x -= speed * delta;
    if (keys.current["KeyD"]) vel.current.x += speed * delta;
    if (keys.current["KeyQ"]) vel.current.y -= speed * delta;
    if (keys.current["KeyE"]) vel.current.y += speed * delta;
    camera.position.add(vel.current.applyQuaternion(camera.quaternion));
  });

  return null;
}

// --- Touch Controls ---
function TouchControls() {
  const { camera } = useThree();
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const fingers = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      fingers.current = e.touches.length;
      lastTouch.current =
        e.touches.length === 1
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : {
              x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
              y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
            };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!lastTouch.current) return;

      if (fingers.current === 1) {
        const dx = e.touches[0].clientX - lastTouch.current.x;
        const dy = e.touches[0].clientY - lastTouch.current.y;
        const sensitivity = 0.005;
        camera.rotation.y -= dx * sensitivity;
        camera.rotation.x -= dy * sensitivity;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }

      if (fingers.current === 2 && e.touches.length === 2) {
        const avgX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const avgY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const dx = avgX - lastTouch.current.x;
        const dy = avgY - lastTouch.current.y;

        const dir = new THREE.Vector3();
        if (Math.abs(dy) > Math.abs(dx)) dir.set(0, 0, -Math.sign(dy));
        else dir.set(Math.sign(dx), 0, 0);
        dir.applyQuaternion(camera.quaternion);
        camera.position.addScaledVector(dir, 0.05);
        lastTouch.current = { x: avgX, y: avgY };
      }
    };

    const handleTouchEnd = () => {
      lastTouch.current = null;
      fingers.current = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera]);

  return null;
}

// --- Main Chatbot Component ---
export default function Chatbot3DModel() {
  const controlsRef = useRef<any>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const roomId = "main-room";

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Socket.IO: join room & listen for bot replies
  useEffect(() => {
    socket.emit("join-room", roomId);

    const botReplyHandler = (data: { reply: string; from: string }) => {
      setMessages((prev) => [...prev, { bot: data.reply }]);
    };

    socket.on("bot-reply", botReplyHandler);

    return () => {
      socket.off("bot-reply", botReplyHandler);
    };
  }, [roomId]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { user: input }]);
    socket.emit("user-message", { roomId, message: input });
    setInput("");
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 75 }} gl={{ antialias: true }} style={{ background: "black" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#ff6dcb" />
        <spotLight position={[0, 5, 0]} angle={0.3} intensity={1} castShadow />
        <Suspense fallback={null}>
          <SpaceBackground />
          <Robot />
          <Stars />
          <ShootingStars />
        </Suspense>
        <PointerLockControls ref={controlsRef} />
        <FlyControls />
        <TouchControls />
      </Canvas>

      {/* Chat UI */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[420px] flex flex-col gap-2">
        <div className="max-h-48 overflow-y-auto bg-black/50 rounded-lg p-2 text-white">
          {messages.map((msg, idx) =>
            msg.user ? (
              <div key={idx} className="text-right text-blue-300">{msg.user}</div>
            ) : (
              <div key={idx} className="text-left text-green-300">{msg.bot}</div>
            )
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-center border border-neutral-600/40 rounded-full px-4 py-2 shadow-lg backdrop-blur-md bg-black/30">
          <input
            type="text"
            placeholder="Message Chatbot..."
            className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => controlsRef.current?.unlock()}
            onBlur={() => controlsRef.current?.lock()}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="ml-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
