import { SeveredTable } from "../../../models/index.js";

export const getAllTables = async (req, res) => {
  const tables = await SeveredTable.find().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Tables retrieved successfully",
    code: "SUCCESS",
    data: tables,
  });
};
