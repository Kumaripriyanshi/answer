import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    listContent: [
      { type: mongoose.ObjectId, ref: "listsContent", required: true },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("lists", listSchema);
