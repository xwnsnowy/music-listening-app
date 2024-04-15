import { Router } from "express";
import {
  getProfileById,
  createProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import { checkProfileOwner } from "../middlewares/checkProfileOwner.js";
const profileRouter = Router();

profileRouter.get("/", getProfiles);

profileRouter.get("/:id", getProfileById);

profileRouter.use(checkPermission);
profileRouter.use(checkProfileOwner);

profileRouter.post("/create", createProfile);

profileRouter.put("/update/:id", updateProfile);

profileRouter.delete("/delete/:id", deleteProfile);

export default profileRouter;
