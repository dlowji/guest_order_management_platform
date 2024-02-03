import { SeveredTable } from "../../../models/index.js";

export const getTablesByStatus = async (req, res) => {
  let { statusQ } = req.query;
  statusQ = statusQ.toUpperCase();
  const tables = await SeveredTable.find({ status: statusQ }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "Tables retrieved by status successfully",
    code: "SUCCESS",
    statusQuery: statusQ,
    data: tables,
  });
};
