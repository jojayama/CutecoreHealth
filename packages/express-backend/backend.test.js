//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";
import dotenv from "dotenv";
import userModel from "./schemas/user.js";

beforeAll(() => {
  const connectionString = process.env.MONGODB_URI;

  mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
});

test("Testing addUser()", async () => {
  const email = "charlieisntbored@gmail.com";
  const password = "calpoly123"

  const got = await mut.addUser(email, password);
  expect(got._id).toBeDefined();
  expect(got.email).toBe(email);
  expect(got.password).toBeDefined();

  userModel.findByIdAndDelete(got._id);
});

test("Testing findUserByEmail()", async () => {
    const email = "charlieisbored@gmail.com";
    const password = "calpoly123"
    const mockUser = new userModel({ email, password });
    await mockUser.save();

    const got = await mut.findUserByEmail(email);
    expect(got[0].email).toBe(email);

    userModel.findByIdAndDelete(got._id);
});

test("Testing findUserById()", async () => {
  const email = "sammywammy@gmail.com";
  const password = "drinkicecofypanikatak"
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();

  const got = await mut.findUserById(savedUser._id);
  expect(got.email).toBe(email);
  expect(got.password).toBe(password);
});

test("Testing getUsers() -- all users", async () => {
  const got = await mut.getUsers();
  expect(got.length).toBeGreaterThanOrEqual(0);
});

test("Testing deleteUserById()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

afterAll(() => {
  mongoose.connection.close();
});