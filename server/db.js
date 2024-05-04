import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
}
