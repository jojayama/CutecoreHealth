import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    entry: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "diaryEntries" },
);

const Diary = mongoose.model("Diary", diarySchema);

export default Diary;
