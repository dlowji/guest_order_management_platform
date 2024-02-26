import { Router } from "express";
import OrderController from "../controllers/order/index.js";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrderById);
router.get("/", OrderController.getOrdersByProperties);
router.post("/placed", OrderController.placeOrder);
router.post("/checkout", OrderController.checkOutOrder);
router.post("/progress", OrderController.progressOrder);
export default router;
