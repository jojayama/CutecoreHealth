//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";

test("Testing findUserByName() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserById() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing addUser() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByEmail() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing findUserByNameAndEmail() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing getUsers() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

test("Testing deleteUserById() -- success", () => {
  const expected = "";
  const got = "";
  expect(got).toBe(expected);
});

afterAll(() => {
  mongoose.connection.close();
});
