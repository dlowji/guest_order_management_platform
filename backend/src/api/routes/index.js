import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { specs, swaggerConfig } from "../../config/index.js";
import user from "./user.js";
import table from "./table.js";
import kitchen from "./kitchen.js";
// import order from "./order.js";
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use("/users", user);
router.use("/kitchen", kitchen);
router.use("/table", table);
// router.use("/orders", order);

export default router;
