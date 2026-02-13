import express from "express";
import { startTopicScheduler } from "../../cron/topicScheduler";
import topicsRouter from "../../routes/topics";

const app = express();

// Middleware
app.use(express.json());

// Start the scheduler
startTopicScheduler();

// Root route
app.get("/", (_req, res) => res.send("Server is running"));

// API route for frontend to fetch upcoming topics
app.use("/api", topicsRouter);

// Start server
app.listen(3000, () => console.log("Server started on port 3000"));
