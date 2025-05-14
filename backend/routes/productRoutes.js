import express from "express";
import router from "Router";
import { addProduct,findProduct,deleteProduct,updateProduct } from "../controllers/productControllers";

router.route("/", get(findProduct).put(addProduct));
router.route("/:id", delete(deleteProduct).put(updateProduct))



export default router;