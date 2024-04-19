import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    followers: {
      type: Number,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Artist", artistSchema);
