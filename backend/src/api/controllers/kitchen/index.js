import { createCategory } from "./categories/create-category.js";
import { createDish } from "./dishes/create-dish.js";
import { getAllCategories } from "./categories/get-all-categories.js";
import { getDishes } from "./dishes/get-dishes.js";
import { getDishById } from "./dishes/get-dish-by-id.js";
import { toggleDishStatus } from "./dishes/toggle-dish-status.js";

const KitChenController = {
  createCategory,
  getAllCategories,
  createDish,
  getDishById,
  getDishes,
  toggleDishStatus,
};

export default KitChenController;
