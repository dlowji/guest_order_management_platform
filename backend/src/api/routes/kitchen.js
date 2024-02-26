import Router from "express";
import KitchenController from "../controllers/kitchen/index.js";
const router = Router();

router.get("/dishes/:id", KitchenController.getDishById);
router.get("/dishes", KitchenController.getDishesByProperties);
router.get("/categories", KitchenController.getAllCategories);

router.post("/dishes/create", KitchenController.createDish);
router.post("/categories/create", KitchenController.createCategory);
router.post("/dishes/mark-done/:dishId", KitchenController.markDishesDone);
router.post("/dishes/toggle/:dishId", KitchenController.toggleDishStatus);

export default router;
