import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";
import User from "./schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function to generate Access tokens
// takes in a username
function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

// middleware function to authenticate users
export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    console.log("Received token:", token);
    console.log("Authorized Header: ", authHeader);
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        // allowed to continue to the route
        req.user = decoded;
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

const creds = [];

export function registerUser(req, res) {
  const { email, pwd } = req.body; // from form

  if (!email || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.email === email)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(email).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token: token });
          creds.push({ email, hashedPassword });
        });
      });
  }
}

export async function loginUser(req, res) {
  const email = req.body.email;
  const pwd = req.body.password;
  await connectDB();
  const retrievedUser = await User.findOne({ email });

  console.log(pwd);
  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(pwd, retrievedUser.password)
      .then((matched) => {
        if (matched) {
          generateAccessToken(email).then((token) => {
            res.status(200).send({
              token: token,
              email: email,
            });
          });
        } else {
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}
