import mongoose from "mongoose";

const listContentSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
    filter: {
      type: String,
      // required: true,
      //   unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    imgLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("listsContent", listContentSchema);
