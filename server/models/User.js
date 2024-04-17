import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Object,
    },
    gender: {
      type: String,
      enum: [
        "male",
        "female",
        "non-binary",
        "something-else",
        "prefer-not-to-say",
      ],
    },
    role: {
      type: String,
      default: "member",
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
