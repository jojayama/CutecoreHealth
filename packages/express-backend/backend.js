import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import userServices from "./user-services.js";
import Reminder from "./schemas/reminderSchema.js";

import Goal from "./schemas/goalSchema.js";
import Diary from "./schemas/diarySchema.js";

dotenv.config();
const app = express();
const port = 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

app.use(setCorsHeaders);
app.use(express.json());

// connect to app
app.listen(process.env.PORT || port, () => {
  console.log(
    "Rest API is listening at https://cuteCore-health.azurewebsites.net",
  );
});

app.get("/", (req, res) => {
  res.send("Hello Cutecore World! Go to your users page.");
});

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
    const reminder = await Reminder.find({ userId: id });
    console.log("Successfully deleted reminder.");
    res.status(200).json(reminder);
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
    const goal = await Goal.find({ userId: id });
    res.status(200).json(goal);
  } catch (error) {
    console.error("Could not delete goal. Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });

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

// will want to change this to delete by email
// input email, match id then use id to delete
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .deleteUserById(id)
    .then((users) => res.status(204).send({ users: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Account not found.");
    });
});
