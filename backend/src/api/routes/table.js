import Router from "express";
import TableController from "../controllers/table/index.js";
const router = Router();

router.get("/:id", TableController.getTableById);
router.get("", TableController.getTables);
router.post("/create", TableController.createTable);

export default router;
