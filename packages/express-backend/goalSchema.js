import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
        },
        deadline: {
            type: Date,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { collection: "goals" }
);

export default goalSchema;