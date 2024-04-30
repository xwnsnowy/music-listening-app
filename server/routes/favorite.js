import { Router } from "express";
import {
  addToFavorite,
  checkIfFavorite,
  removeFromFavorite,
} from "../controllers/favorite.js";

const favoriteRouter = Router();

favoriteRouter.post("/check", checkIfFavorite);

favoriteRouter.post("/add", addToFavorite);

favoriteRouter.delete("/remove/:userId/:songId", removeFromFavorite);

export default favoriteRouter;
