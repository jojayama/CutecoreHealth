import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
let connection;

console.log(process.env.MONGODB_URI);

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function at the start of api routes and data fetches
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    try {
      connection = await mongoose.connect(url, {
        dbName: "",
      });
    } catch (error) {
      console.error("Could not connect to MongoDB. Error: ", error);
    }
    return connection;
  }
};

export default connectDB;
