import { Router } from "express";
import { getSongByName } from "../controllers/song.js";

const searchRouter = Router();

searchRouter.get("/", getSongByName);

export default searchRouter;
