import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY");
  process.exit(1);
} else {
  console.log("Loaded OPENAI_API_KEY ✅");
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  path: "/socket.io/",
});

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const rooms: Record<string, string[]> = {};

// Routes
app.get("/", (_, res) => res.send("Server is running!"));
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Optional REST fallback
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for a 3D web chatbot." },
        { role: "user", content: message },
      ],
    });

    const reply = response.choices?.[0]?.message?.content || "No response from AI";
    res.json({ reply });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact AI" });
  }
});

// Socket.IO connections
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push(socket.id);

    console.log(`👥 ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit("user-joined", socket.id);
    socket.emit("existing-users", rooms[roomId].filter((id) => id !== socket.id));
  });

  socket.on("user-message", async ({ roomId, message }: { roomId: string; message: string }) => {
    console.log(`💬 Message from ${socket.id} in room ${roomId}:`, message);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for a 3D web chatbot." },
          { role: "user", content: message },
        ],
      });

      const reply = response.choices?.[0]?.message?.content || "Sorry, no response from AI.";
      console.log("🤖 AI reply:", reply);
      io.to(roomId).emit("bot-reply", { reply, from: "AI" });
    } catch (err: any) {
      console.error("❌ OpenAI Error:", err.response?.data || err.message || err);
      io.to(roomId).emit("bot-reply", { reply: "Error contacting AI.", from: "AI" });
    }
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      socket.to(roomId).emit("user-left", socket.id);
      if (rooms[roomId].length === 0) delete rooms[roomId];
    }
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
server.listen(PORT, () => console.log(`✅ Socket.IO server running on http://localhost:${PORT}`));
