import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./schemas/user.js";
import connectDB from "./db.js";
import User from "./schemas/user.js";
import bcrypt from "bcrypt"; // Import to encrypt passwords
import Goal from "./schemas/goalSchema.js";
import Reminder from "./schemas/reminderSchema.js";

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
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

function getUsers(name, email) {
  let promise;
  if (name === undefined && email === undefined) {
    promise = userModel.find();
  } else if (name && !email) {
    promise = findUserByName(name);
  } else if (email && !name) {
    promise = findUserByEmail(email);
  } else if (name && email) {
    promise = findUserByNameAndEmail(name, email);
  }
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}
function findUserById(id) {
  return userModel.findById(id);
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

function findUserByNameAndEmail(name, email) {
  return userModel.find({ name: name, email: email });
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

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByEmail,
  findUserByNameAndEmail,
  deleteUserById,
  deleteGoalbyId,
  deleteReminderbyId,
};
