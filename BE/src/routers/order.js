import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controller/order.js";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);
export default router;