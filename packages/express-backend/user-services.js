import dotenv from "dotenv";
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

// to connect to database
dotenv.config();

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

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
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

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByEmail,
  findUserByNameAndEmail,
  deleteUserById,
};
