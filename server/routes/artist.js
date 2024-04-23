import { Router } from "express";
import { createArtist } from "../controllers/artist.js";
import { upload } from "../middlewares/multer.js";

const artistRouter = Router();

artistRouter.post("/create", upload.single("picture"), createArtist);

export default artistRouter;
