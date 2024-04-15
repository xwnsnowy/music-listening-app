import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProduct,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

// ! Check permission for method: DELETE, PUT, POST
productRouter.use(checkPermission);

productRouter.post("/create", createProduct);
productRouter.delete("/delete/:id", removeProductById);
productRouter.put("/remove/:id", softRemoveProductById);
productRouter.put("/update/:id", updateProduct);

export default productRouter;
