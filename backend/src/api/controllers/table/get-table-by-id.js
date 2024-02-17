import { SeveredTable } from "../../../models/index.js";

export const getTableById = async (req, res) => {
  const { id } = req.params;
  const table = await SeveredTable.findById(id).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!table) {
    return res.status(404).json({
      error: {
        message: "Table not found",
        code: "NOT_FOUND",
      },
    });
  }
  return res.status(200).json({
    message: "Table retrieved successfully",
    code: "SUCCESS",
    queryMethod: "BY_ID",
    data: table,
  });
};
