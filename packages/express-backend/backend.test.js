//backend.test.js
import mongoose from "mongoose";
import mut from "./user-services";
import userModel from "./schemas/user.js";
import diaryModel from "./schemas/diarySchema.js";
import goalModel from "./schemas/goalSchema.js";
import reminderModel from "./schemas/reminderSchema.js";

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

/*
 * User Testing
 */
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

/*
 * Diary Testing
 */
test("Testing deleteDiarybyId()", async () => {
  const email = "jodi@gmail.com";
  const password = "eheh123"
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();

  const title = "Testing!!";
  const entry = "testing entry :)";
  const date = "6/7/2024";
  const userId = savedUser._id;
  const mockDiary = new diaryModel({ title, entry, date, userId });
  const savedDiary = await mockDiary.save();

  const got = await mut.deleteDiarybyId(savedDiary._id);
  expect(got._id).toBeDefined();
  expect(got.title).toBe(savedDiary.title);

  const deletedDiary = await mut.findDiaryById(savedUser._id);
  expect(deletedDiary).toBeNull();

  await mut.deleteUserById(savedUser._id);
});

test("Testing findDiaryById()", async () => {
  const email = "sammywammy@gmail.com";
  const password = "drinkicecofypanikatak";
  const mockUser = new userModel({ email, password });
  const savedUser = await mockUser.save();

  const title = "I am panicking";
  const entry = "Today I had iced coffee and now it is causing me to panic ;-;";
  const date = "6/7/2024";
  const userId = savedUser._id;
  const mockDiary = new diaryModel({ title, entry, date, userId });
  const savedDiary = await mockDiary.save();

  const got = await mut.findDiaryById(savedDiary._id);
  expect(got.title).toBe(title);
  expect(got.entry).toBe(entry);
  expect(got.date).toBe(date);
  expect(got.userId).toBeDefined();
  expect(got._id).toBeDefined();

  await mut.deleteUserById(savedUser._id);
  await mut.deleteDiarybyId(savedDiary._id);
});


/*
 * Goal Testing
 */



/*
 * Reminder Testing
 */

afterAll(() => {
  mongoose.connection.close();
});