import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import userServices from "./user-services.js";
import Reminder from "./schemas/reminderSchema.js";
import Goal from "./schemas/goalSchema.js";
import Diary from "./schemas/diarySchema.js";
import User from "./schemas/user.js";
import { authenticateUser, loginUser, registerUser } from "./auth.js";

dotenv.config();

const app = express();
const port = 8000;

const corsOptions = {
  origin: "https://cutecore-health-react-frontend.vercel.app",
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());

// Middleware to log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);
  console.log("Request Query:", req.query);
  next();
});

// connect to app
app.listen(process.env.PORT || port, () => {
  console.log(
    "Rest API is listening at https://cutecore-health-react-backend.vercel.app",
  );
});

app.get("/", (req, res) => {
  res.send("Hello Cutecore World! Go to your users page.");
});

// User Sign In
app.post("/api/sign-in", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/login", loginUser);

app.get("/users", (req, res) => {
  const { name, email } = req.query;
  userServices
    .getUsers(name, email)
    .then((users) => res.send({ users: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Resource not found.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .findUserById(id)
    .then((users) => res.send({ users: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Account not found.");
    });
});

app.post("/createAccount", registerUser);

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await userServices.addUser(email, password);
    console.log("success!");
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    if (error.message === "Email already taken") {
      res.status(400).send({ message: "Email already used" });
    } else if (error.message === "All fields are required") {
      res.status(400).send({ message: "All fields are required" });
    } else {
      res.status(500).send({ message: "Internal Server Error: " + error });
    }
  }
});

app.use(authenticateUser);

//change User email
app.post("users/:id", async (req, res) => {
  const { userId, newEmail } = req.body;

  try {
    // Find the user in MongoDB by ID
    const user = await userServices.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's email in MongoDB
    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "Email updated in MongoDB" });
  } catch (error) {
    console.error("Error updating email in MongoDB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//creating a reminder
app.post("/reminders/:id", async (req, res) => {
  try {
    const getReminder = req.body;
    console.log(getReminder);

    const user = await userServices.findUserById(req.params.id);
    console.log(user);
    const newReminder = new Reminder({
      title: getReminder.title,
      note: getReminder.note,
      date: getReminder.date,
      time: getReminder.time,
      userId: user._id,
    });
    await newReminder.save();
    console.log("Success! Reminder: " + newReminder);
    res.status(201);
    res.send(newReminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/reminders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reminders = await Reminder.find({ userId: id });
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Could not get reminders. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete reminder
app.delete("/reminders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userServices.deleteReminderbyId(id);
    if (response === undefined) {
      res.status(404).send("Could not find reminder");
    } else {
      res.status(204).json({
        message: `Reminder deleted successfuly!`,
      });
    }
  } catch (error) {
    console.error("Could not delete reminder. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//creating a goal
app.post("/goals/:id", async (req, res) => {
  try {
    const getGoal = req.body;
    console.log(getGoal);

    const user = await userServices.findUserById(req.params.id);
    console.log(user);
    const newGoal = new Goal({
      title: getGoal.title,
      description: getGoal.description,
      deadline: getGoal.deadline,
      userId: user._id,
    });
    await newGoal.save();
    console.log("Success! Goal: " + newGoal);
    res.status(201);
    res.send(newGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get a goal
app.get("/goals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.find({ userId: id });
    res.status(200).json(goal);
  } catch (error) {
    console.error("Could not get goal. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete goal
app.delete("/goals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userServices.deleteGoalbyId(id);
    if (response === undefined) {
      res.status(404).send("Could not find goal");
    } else {
      res.status(204).json({
        message: `Goal deleted successfuly!`,
      });
    }
  } catch (error) {
    console.error("Could not delete goal. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// creating a diary entry
app.post("/diaryEntries/:id", async (req, res) => {
  try {
    const getEntry = req.body;
    console.log(getEntry);

    const user = await userServices.findUserById(req.params.id);
    console.log(user);
    const newEntry = new Diary({
      title: getEntry.title,
      entry: getEntry.entry,
      date: getEntry.date,
      userId: user._id,
    });
    await newEntry.save();
    console.log("Success! Entry: " + newEntry);
    res.status(201);
    res.send(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get a diary entries by user
app.get("/diaryEntries/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const diary = await Diary.find({ userId: userId });
    res.status(200).json(diary);
  } catch (error) {
    console.error("Could not get diary. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete diary
app.delete("/diaryEntries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userServices.deleteDiarybyId(id);
    if (response === undefined) {
      res.status(404).send("Could not find diary entry");
    } else {
      res.status(204).json({
        message: `Diary entry deleted successfuly!`,
      });
    }
  } catch (error) {
    console.error("Could not delete diary entry. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get a diary entries by id
app.get("/diaryEntries/:userId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const diary = await userServices.findDiaryById(id);
    res.status(200).json(diary);
  } catch (error) {
    console.error("Could not get diary. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// will want to change this to delete by email
// input email, match id then use id to delete
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userServices.deleteUserById(id);
    if (response === undefined) {
      res.status(404).send("Could not find user");
    } else {
      res.status(204).json({
        message: `User deleted successfuly!`,
      });
    }
  } catch (error) {
    console.error("Could not delete user. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
