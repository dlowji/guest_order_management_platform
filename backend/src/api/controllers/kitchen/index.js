import { createCategory } from "./categories/create-category.js";
import { createDish } from "./dishes/create-dish.js";
import { getAllCategories } from "./categories/get-all-categories.js";
import { getDishesByProperties } from "./dishes/get-dishes-by-properties.js";
import { getDishById } from "./dishes/get-dish-by-id.js";
import { toggleDishStatus } from "./dishes/toggle-dish-status.js";
import { markDishesDone } from "./dishes/mark-dishes-done.js";

const KitChenController = {
  createCategory,
  getAllCategories,
  createDish,
  getDishById,
  getDishesByProperties,
  toggleDishStatus,
  markDishesDone,
};

export default KitChenController;
