import Router from "express";
import KitchenController from "../controllers/kitchen/index.js";
const router = Router();

router.get("/dishes/:id", KitchenController.getDishById);
router.get("/dishes", KitchenController.getDishes);
router.post("/dishes/create", KitchenController.createDish);
// router.post("/dishes/mark-done", KitchenController.);
router.post("/dishes/toggle/:dishId", KitchenController.toggleDishStatus);
router.get("/categories", KitchenController.getAllCategories);
router.post("/categories/create", KitchenController.createCategory);

export default router;
