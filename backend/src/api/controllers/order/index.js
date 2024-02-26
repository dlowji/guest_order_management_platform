import { checkOutOrder } from "./check-out-order.js";
import { createOrder } from "./create-order.js";
import { getOrderById } from "./get-order-by-id.js";
import { getOrdersByProperties } from "./get-orders-by-properties.js";
import { placeOrder } from "./place-order.js";
import { progressOrder } from "./progress-order.js";

const OrderController = {
  createOrder,
  getOrderById,
  getOrdersByProperties,
  placeOrder,
  checkOutOrder,
  progressOrder,
};

export default OrderController;
