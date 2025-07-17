import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.Schema("Message", messageModel);
