import { getDishesByStatus } from "./get-dishes-by-status.js";
import { getDishesByCategory } from "./get-dishes-by-category.js";
import { getAllDishes } from "./get-all-dishes.js";

export const getDishes = async (req, res) => {
  const { statusQ } = req.query;
  if (statusQ) {
    return getDishesByStatus(req, res);
  }

  const { categoryQ } = req.query;
  if (categoryQ) {
    return getDishesByCategory(req, res);
  }

  return getAllDishes(req, res);
};
