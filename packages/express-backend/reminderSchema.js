import mongoose, {Schema} from "mongoose";

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
        time:{
            type: String,
        }
    },
    { collection: "reminders" }
);

export default reminderSchema;

