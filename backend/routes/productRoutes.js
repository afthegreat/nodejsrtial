import express from "express";
import { addProduct,findProduct,deleteProduct,updateProduct } from "../controllers/productControllers.js";

const router = express.Router();
router.route("/"). get(findProduct).post(addProduct)
router.route("/:id"). delete(deleteProduct).put(updateProduct)



export default router;