import { Router } from "express";
import {
  addToFavorite,
  checkIfFavorite,
  getAllFavorite,
  removeFromFavorite,
} from "../controllers/favorite.js";

const favoriteRouter = Router();

favoriteRouter.get("/:userId", getAllFavorite);

favoriteRouter.post("/check", checkIfFavorite);

favoriteRouter.post("/add", addToFavorite);

favoriteRouter.delete("/remove/:userId/:songId", removeFromFavorite);

export default favoriteRouter;
