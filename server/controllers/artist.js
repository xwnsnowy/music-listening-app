import Artist from "../models/Artist.js";
import cloudinary from "../utils/cloudinary.js";
import { validBody } from "../utils/validBody.js";
import { artistSchema } from "../validations/artist.js";

export const createArtist = async (req, res, next) => {
  try {
    const errors = validBody(req.body, artistSchema);

    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const picturePath = await cloudinary.uploader.upload(file.path);

    const newArtistData = {
      ...req.body,
      picture: picturePath.secure_url,
    };

    const data = await Artist.create(newArtistData);

    if (data) {
      return res.status(201).json({
        message: "Create Artist successfully",
        data,
      });
    }

    return res.status(500).json({
      message: "Create Artist failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllArtists = async (req, res, next) => {
  try {
    const data = await Artist.find({});
    if (data) {
      return res.status(201).json({
        message: "Get All Artist successfully",
        data,
      });
    }

    return res.status(500).json({
      message: "Get ALl Artist failed",
    });
  } catch (error) {
    next(error);
  }
};
