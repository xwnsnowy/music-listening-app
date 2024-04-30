import Song from "../models/Song.js";
import cloudinary from "../utils/cloudinary.js";
import { validBody } from "../utils/validBody.js";
import { songSchema } from "../validations/song.js";

export const createSong = async (req, res, next) => {
  try {
    const errors = validBody(req.body, songSchema);

    if (errors) {
      return res.status(400).json({
        message: "Validation errors",
        errors,
      });
    }

    const pictureFile = req.files["picture"][0];
    const songFile = req.files["song"][0];

    if (!pictureFile || !songFile) {
      return res.status(400).json({
        message: "Both picture and song files are required",
      });
    }

    const picturePath = await cloudinary.uploader.upload(pictureFile.path);
    const songPath = await cloudinary.uploader.upload(songFile.path, {
      resource_type: "auto",
    });

    const newSongData = {
      ...req.body,
      picture: picturePath.secure_url,
      song: songPath.secure_url,
    };

    const data = await Song.create(newSongData);

    if (data) {
      return res.status(201).json({
        message: "Create Song successfully",
        data,
      });
    }

    return res.status(500).json({
      message: "Create Song failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSongs = async (req, res, next) => {
  try {
    const data = await Song.find({});
    if (data) {
      return res.status(201).json({
        message: "Get All Song successfully",
        data,
      });
    }

    return res.status(500).json({
      message: "Get ALl Song failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getSongByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      const allSongs = await Song.find();
      return res.status(200).json({
        message: "All songs retrieved successfully",
        data: allSongs,
      });
    }

    const songs = await Song.find({ name: { $regex: new RegExp(name, "i") } });

    if (songs.length > 0) {
      return res.status(200).json({
        message: "Songs found successfully",
        data: songs,
      });
    } else {
      return res.status(404).json({
        message: "No songs found with the given name",
      });
    }
  } catch (error) {
    next(error);
  }
};
