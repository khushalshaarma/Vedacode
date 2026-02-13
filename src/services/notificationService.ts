import nodemailer from "nodemailer";
import { TopicSchedule } from "@/types";

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  auth: { user: "your_email@example.com", pass: "password" },
});

export const sendNotification = async (topic: TopicSchedule) => {
  await transporter.sendMail({
    from: '"School Scheduler" <noreply@school.com>',
    to: "student@example.com",
    subject: `Reminder: ${topic.topicName} Today`,
    text: `Don't forget! ${topic.topicName} is scheduled on ${topic.scheduledDate}`,
  });

  console.log(`Notification sent for topic: ${topic.topicName}`);
};
