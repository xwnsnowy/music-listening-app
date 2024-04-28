import { Router } from "express";
import { createArtist, getAllArtists } from "../controllers/artist.js";
import { upload } from "../middlewares/multer.js";

const artistRouter = Router();

artistRouter.get("/", getAllArtists);

artistRouter.post("/create", upload.single("picture"), createArtist);

export default artistRouter;
