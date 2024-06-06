//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";
import userModel from "./user.js"

test("Testing findUserByName()", () => {
  const expected = mut.getUsers();
  const got = userModel.find();
  expect(got).toBe(expected);
});

test("Testing findUserById()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing addUser()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByEmail()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByNameAndEmail()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing getUsers()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing deleteUserById()", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

afterAll(() => {
  mongoose.connection.close();
});
