import express from "express";
import cors from "cors";
//import mongoose from "mongoose";
//import dotenv from "dotenv";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// connect to app
app.listen(process.env.PORT || port, () => {
  console.log(
   "Rest API is listening."
  );
});

app.get("/", (req, res) => {
  res.send("Hello Cutecore World! Go to your users page.");
});

app.get("/users", (req, res) => {
  const { name, email } = req.query;
  userServices
    .getUsers(name, email)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Resource not found.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .findUserById(id)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Account not found.");
    });
});

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((users) => res.status(201).send({ users_list: users }))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Unable to create account.");
    });
});

// will want to change this to delete by email
// input email, match id then use id to delete
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .deleteUserById(id)
    .then((users) => res.status(204).send({ users_list: users }))
    .catch((err) => {
      console.error(err);
      res.status(404).send("Account not found.");
    });
});
