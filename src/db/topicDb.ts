import { TopicSchedule } from "@/types";

// Fetch upcoming topics
export const getUpcomingTopics = async (): Promise<TopicSchedule[]> => {
  // Replace this with real DB query
  return [
    {
      id: 1,
      topicName: "Algebra - Quadratic Equations",
      classId: "10A",
      scheduledDate: new Date(),
      notificationSent: false,
    },
  ];
};

// Mark as sent
export const markNotificationSent = async (id: number) => {
  console.log(`Marking topic ${id} as sent`);
  // DB update query here
};


