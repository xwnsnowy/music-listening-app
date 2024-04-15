import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  removeCategoryById,
  softRemoveCategoryById,
  updateCategory,
} from "../controllers/category.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

// ! Check permission for method: DELETE, PUT, POST
categoryRouter.use(checkPermission);
categoryRouter.post("/create", createCategory);
categoryRouter.delete("/delete/:id", removeCategoryById);
categoryRouter.put("/remove/:id", softRemoveCategoryById);
categoryRouter.put("/update/:id", updateCategory);

export default categoryRouter;
