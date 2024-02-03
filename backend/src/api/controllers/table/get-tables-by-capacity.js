import { SeveredTable } from "../../../models/index.js";

export const getTablesByCapacity = async (req, res) => {
  const { capacityQ } = req.query;
  const tables = await SeveredTable.find({ capacity: capacityQ }).catch(
    (err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    }
  );

  return res.status(200).json({
    message: "Tables retrieved by capacity successfully",
    code: "SUCCESS",
    capacityQuery: capacityQ,
    data: tables,
  });
};
