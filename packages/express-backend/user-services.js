import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./schemas/user.js";
import connectDB from "./db.js";
import User from "./schemas/user.js";
import bcrypt from "bcrypt"; // Import to encrypt passwords

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

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByEmail,
  deleteUserById,
};
