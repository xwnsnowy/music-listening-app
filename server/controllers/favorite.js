import Favorite from "../models/Favorite.js";

export const checkIfFavorite = async (req, res, next) => {
  try {
    const { userId, songId } = req.body;

    const existingFavorite = await Favorite.findOne({
      userId: userId,
      songId: songId,
    });

    if (existingFavorite) {
      return res.status(200).json({
        message: "Song is already in user's favorite list",
        isFavorite: true,
      });
    } else {
      return res.status(200).json({
        message: "Song is not in user's favorite list",
        isFavorite: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addToFavorite = async (req, res, next) => {
  try {
    const { userId, songId } = req.body;

    const newFavorite = await Favorite.create({
      userId: userId,
      songId: songId,
    });

    return res.status(201).json({
      message: "Added song to user's favorite list successfully",
      data: newFavorite,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromFavorite = async (req, res, next) => {
  try {
    const { userId, songId } = req.params;

    const deletedFavorite = await Favorite.findOneAndDelete({
      userId: userId,
      songId: songId,
    });

    if (deletedFavorite) {
      return res.status(200).json({
        message: "Removed song from user's favorite list successfully",
        data: deletedFavorite,
      });
    }
  } catch (error) {
    next(error);
  }
};
