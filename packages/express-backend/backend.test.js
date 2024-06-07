//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";
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

test("Testing deleteUserById()", async () => {
  const email = "eric01@gmail.com";
  const password = "eheh123"
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();
  const got = await mut.deleteUserById(savedUser._id);
  expect(got._id).toBeDefined();
  expect(got.email).toBe(savedUser.email);

  const deletedUser = await mut.findUserById(savedUser._id);
  expect(deletedUser).toBeNull();
});

test("Testing addUser()", async () => {
  const email = "charlieisntbored@gmail.com";
  const password = "calpoly123"

  const got = await mut.addUser(email, password);
  expect(got._id).toBeDefined();
  expect(got.email).toBe(email);
  expect(got.password).toBeDefined();

  await mut.deleteUserById(got._id);
});

test("Testing addUser() -- required fields error", async () => {
  await expect(mut.addUser(undefined, undefined)).rejects.toThrow("All fields are required");
});

test("Testing addUser() -- email taken error", async () => {
  const email = "cypher@gmail.com";
  const password1 = "samisahacker"
  const password2 = "smarterbabysmarter"
  const savedUser = await mut.addUser(email, password1);

  await expect(mut.addUser(email, password2)).rejects.toThrow("Email already taken");
  
  await mut.deleteUserById(savedUser._id);
});

test("Testing findUserByEmail()", async () => {
    const email = "charlieisbored@gmail.com";
    const password = "calpoly123"
    const mockUser = new userModel({ email, password });
    const savedUser = await mockUser.save();

    const got = await mut.findUserByEmail(savedUser.email);
    expect(got[0].email).toBe(savedUser.email);

    await mut.deleteUserById(savedUser._id);
});

test("Testing findUserById()", async () => {
  const email = "sammywammy@gmail.com";
  const password = "drinkicecofypanikatak"
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();

  const got = await mut.findUserById(savedUser._id);
  expect(got.email).toBe(email);
  expect(got.password).toBeDefined();

  await mut.deleteUserById(got._id);
});

test("Testing getUsers() -- all users", async () => {
  const got = await mut.getUsers();
  expect(got.length).toBeGreaterThan(1);
});

test("Testing getUsers() -- certain user", async () => {
  const email = "jodilover@gmail.com";
  const password = "jodiomgggg"
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();

  const got = await mut.getUsers(undefined, savedUser.email);
  expect(got[0]._id).toBeDefined();
  expect(got[0].email).toBe(savedUser.email);

  await mut.deleteUserById(savedUser._id);
});

afterAll(() => {
  mongoose.connection.close();
});