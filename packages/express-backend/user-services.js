import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./schemas/user.js";
import diaryModel from "./schemas/diarySchema.js";
import connectDB from "./db.js";
import User from "./schemas/user.js";
import bcrypt from "bcrypt"; // Import to encrypt passwords
import Goal from "./schemas/goalSchema.js";
import Reminder from "./schemas/reminderSchema.js";
import Diary from "./schemas/diarySchema.js";

mongoose.set("debug", true);

// to connect to database
dotenv.config();
await connectDB();

const connectionString = process.env.MONGODB_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

function getUsers(name, email) {
  let promise;
  if (email === undefined) {
    promise = userModel.find();
  } else if (email) {
    promise = findUserByEmail(email);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function findDiaryById(id) {
  return diaryModel.findById(id);
}

function findGoalById(id) {
  return Goal.findById(id);
}

function findReminderById(id) {
  return Reminder.findById(id);
}

async function addUser(email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already taken");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  await newUser.save();
  console.log(newUser);
  
  return newUser;
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

async function deleteGoalbyId(goalId) {
  try {
    const result = await Goal.findByIdAndDelete(goalId);
    return result;
  } catch (error) {
    console.error("Could not find goal: ", error);
    throw error;
  }
}

async function deleteReminderbyId(reminderId) {
  try {
    const result = await Reminder.findByIdAndDelete(reminderId);
    return result;
  } catch (error) {
    console.error("Could not find reminder: ", error);
    throw error;
  }
}

async function deleteDiarybyId(diaryId) {
  try {
    const result = await Diary.findByIdAndDelete(diaryId);
    return result;
  } catch (error) {
    console.error("Could not find diary: ", error);
    throw error;
  }
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByEmail,
  deleteUserById,
  findGoalById,
  deleteGoalbyId,
  findReminderById,
  deleteReminderbyId,
  findDiaryById,
  deleteDiarybyId,
};
