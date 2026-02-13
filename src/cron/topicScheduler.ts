// backend/cron/topicScheduler.ts
import cron from "node-cron";
import { getUpcomingTopics, markNotificationSent } from "../db/topicDb";
import { sendNotification } from "../services/notificationService";

export const startTopicScheduler = () => {
  // Run every minute to check upcoming topics
  cron.schedule("* * * * *", async () => {
    const topics = await getUpcomingTopics();
    const now = new Date();

    topics.forEach(async (topic) => {
      const topicTime = new Date(topic.scheduledDate);

      // Send notification 10 min before scheduled time
      if (!topic.notificationSent && topicTime.getTime() - now.getTime() <= 10 * 60 * 1000) {
        await sendNotification(topic);
        await markNotificationSent(topic.id);
      }
    });
  });

  console.log("📌 Topic Scheduler running...");
};
