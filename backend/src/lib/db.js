import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB connected:", conn.connection.host);
  } catch (error) {
    console.error("Failed to connect to the MONGODB:", error);
    process.exit(1); // 1 status code means fail, 0 means success
  }
};
