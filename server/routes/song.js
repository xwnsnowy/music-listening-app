import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { getSongById, createSong, getAllSongs } from "../controllers/song.js";

const songRouter = Router();

songRouter.get("/", getAllSongs);

songRouter.get("/:songId", getSongById);

songRouter.post(
  "/create",
  upload.fields([{ name: "picture" }, { name: "song" }]),
  createSong
);

export default songRouter;
