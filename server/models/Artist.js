import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    followers: {
      type: Number,
      default: 0,
    },
    facebook: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/(www\.)?facebook\.com\/.+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Facebook URL!`,
      },
    },
    twitter: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/(www\.)?twitter\.com\/.+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Twitter URL!`,
      },
    },
    instagram: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/(www\.)?instagram\.com\/.+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Instagram URL!`,
      },
    },
    linkedin: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid LinkedIn URL!`,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Artist", artistSchema);
