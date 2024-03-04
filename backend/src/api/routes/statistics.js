import Router from "express";
import StatisticsController from "../controllers/statistics/index.js";
const router = Router();

router.get("/best-seller/:limit", StatisticsController.getBestSeller);
router.get("/home", StatisticsController.getHome);

export default router;
