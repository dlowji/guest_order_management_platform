import { getAllTables } from "./get-all-tables.js";
import { getTablesByCapacity } from "./get-tables-by-capacity.js";
import { getTablesByStatus } from "./get-tables-by-status.js";

export const getTables = async (req, res) => {
  const { statusQ } = req.query;
  if (statusQ) {
    return getTablesByStatus(req, res);
  }

  const { capacityQ } = req.query;
  if (capacityQ) {
    return getTablesByCapacity(req, res);
  }

  return getAllTables(req, res);
};
