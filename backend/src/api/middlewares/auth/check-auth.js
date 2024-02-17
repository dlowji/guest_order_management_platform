import { User, Token } from "../../../models/index.js";
import { errorHelper } from "../../../utils/index.js";
import { jwtSecretKey } from "../../../config/index.js";
import pkg from "mongoose";
const { Types } = pkg;
import jwt from "jsonwebtoken";
const { verify } = jwt;

export default async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "No token provided",
      },
    });

  if (token.includes("Bearer"))
    token = req.header("Authorization").replace("Bearer ", "");

  try {
    req.user = verify(token, jwtSecretKey);
    if (!Types.ObjectId.isValid(req.user._id))
      return res.status(400).json({
        error: {
          code: "INVALID_ID",
          message: "Invalid user id",
        },
      });

    const exists = await User.exists({
      _id: req.user._id,
      isActivated: true,
    }).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

    if (!exists)
      return res.status(400).json({
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });

    const tokenExists = await Token.exists({
      userId: req.user._id,
      status: true,
    }).catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

    if (!tokenExists)
      return res.status(401).json({
        error: {
          code: "UNAUTHORIZED",
          message: "Token is not valid",
        },
      });

    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid token",
      },
    });
  }
};
