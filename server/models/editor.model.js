import mongoose from "mongoose";

const editorSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  content: { type: String, default: "" },
  userId: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  date: { type: String, default: Date.now() },
});

export const Editor = mongoose.model("Editor", editorSchema);
