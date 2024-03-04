import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { specs, swaggerConfig } from "../../config/index.js";
import user from "./user.js";
import table from "./table.js";
import kitchen from "./kitchen.js";
import order from "./order.js";
import statistics from "./statistics.js";
import history from "./history.js";
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use("/users", user);
router.use("/kitchen", kitchen);
router.use("/tables", table);
router.use("/orders", order);
router.use("/statistics", statistics);
router.use("/history", history);

export default router;
