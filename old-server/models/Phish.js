import mongoose from "mongoose";

const phishSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ["Successful", "Pending"],
    required: true,
  },
});

export const Phish = mongoose.model("Phish", phishSchema);
