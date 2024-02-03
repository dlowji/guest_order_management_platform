import { SeveredTable } from "../../../models/index.js";
import { validateCreateTable } from "../../validators/table.validator.js";

export const createTable = async (req, res) => {
  const { error } = validateCreateTable(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { code, capacity } = req.body;

  //check if table's title exists
  const existTable = await SeveredTable.exists({ code }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (existTable) {
    return res.status(409).json({
      error: {
        message: "The table code is already taken.",
        code: "FIELD_ALREADY_EXISTS",
      },
    });
  }

  let table = new SeveredTable({
    code,
    capacity,
  });

  table = await table.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(201).json({
    message: "Severed table created successfully",
    code: "SUCCESS",
    data: table,
  });
};
