import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  notified: { type: Boolean, default: false },
});

export const Topic = mongoose.model("Topic", topicSchema);
