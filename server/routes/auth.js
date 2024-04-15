import { Router } from "express";
import { login, register, userExist } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/user-exist", userExist);
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
