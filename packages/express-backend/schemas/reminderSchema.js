import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "reminders" },
);

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
