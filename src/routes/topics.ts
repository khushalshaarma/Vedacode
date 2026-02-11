// backend/routes/topics.ts
import express from "express";
import { getUpcomingTopics } from "../db/topicDb";

const router = express.Router();

router.get("/upcoming", async (_req, res) => {
  const topics = await getUpcomingTopics();
  res.json(topics);
});

export default router;
