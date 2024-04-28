import { Router } from "express";
import productRouter from "./product.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";
import artistRouter from "./artist.js";
import songRouter from "./song.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/artists", artistRouter);
router.use("/songs", songRouter);

export default router;
