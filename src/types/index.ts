export interface TopicSchedule {
  id: number;
  topicName: string;
  classId: string;
  scheduledDate: Date;
  notificationSent: boolean;
}
