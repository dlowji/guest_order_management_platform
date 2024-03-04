import Router from "express";
import HistoryController from "../controllers/history/index.js";
const router = Router();

router.get("/:filter/:timestamp", HistoryController.getOrderHistoryByDmy);

export default router;
