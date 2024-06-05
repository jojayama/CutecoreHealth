import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import userServices from "./user-services.js";
import reminderSchema from "./schemas/reminderSchema.js";
import goalSchema from "./schemas/goalSchema.js";

dotenv.config();
const app = express();
const port = 8000;

const corsOptions = {
  origin: "https://lemon-wave-0f251421e.5.azurestaticapps.net/",
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

//creating a reminder
app.post("/reminder/:id", async (req, res) => {
  try {
    const getReminder = req.body;
    console.log(getReminder);
    const user = await userServices.findUserByEmail(req.params.id);
    const newReminder = new reminderSchema({
      title: getReminder.title,
      note: getReminder.note,
      date: getReminder.date,
      time: getReminder.time,
      userId: user._id,
    });
    await newReminder.save();
    res.status(201);
    res.send(newReminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//creating a goal
app.post("/goal/:id", async (req, res) => {
  try {
    const getGoal = req.body;
    console.log(getGoal);
    const user = await userServices.findUserByEmail(req.params.id);
    const newGoal = new goalSchema({
      title: getGoal.title,
      description: getGoal.description,
      deadline: getGoal.deadline,
      completed: getGoal.completed,
      userId: user._id,
    });
    await newGoal.save();
    res.status(201);
    res.send(newGoal);
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
