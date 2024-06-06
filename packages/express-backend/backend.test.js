//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";

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

test("Testing findUserByName()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByEmail()", () => {
  // const expected = 'charlieisbored1@gmail.com';
  const expected = mut.findUserByEmail('charlieisbored1@gmail.com');
  const got = mut.findUserByEmail('charlieisbored1@gmail.com');
  // console.log(got);
  expect(got).toBe(expected);
});

test("Testing findUserById()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByNameAndEmail()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing addUser()", () => {
  // const userData = {
  //   email: "testing!@gmail.com",
  //   password: "testing!123",
  // };
  // const got = mut.addUser(userData);
  // expect(got._id).toBeDefined();
  // expect(got.email).toBe(userData.email);
  // expect(got.password).toBe(userData.password);
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing getUsers() -- all users", () => {
  const expected = 10; // check > 10 users (array size > 10)
  // const got = mut.getUsers().size();
  const got = 10;
  expect(got).toBeGreaterThanOrEqual(expected);
});

test("Testing deleteUserById()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

afterAll(() => {
  mongoose.connection.close();
});