import { User, Token } from "../../../../models/index.js";
import { validateLogin } from "../../../validators/user.validator.js";
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { compare } = bcrypt;

export const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    username,
    isActivated: true,
  })
    .select("+password")
    .catch((err) => {
      return res.status(500).json({
        error: {
          message: "An internal server error occurred, please try again.",
          code: "INTERNAL_SERVER_ERROR",
          reason: err.message,
        },
      });
    });

  if (!user)
    return res.status(404).json({
      error: {
        message: "The username or password is incorrect.",
        code: "INVALID_CREDENTIALS",
      },
    });

  if (!user.isActivated)
    return res.status(400).json({
      error: {
        message: "Your account is not activated.",
        code: "ACCOUNT_NOT_ACTIVATED",
      },
    });

  const match = await compare(req.body.password, user.password);
  if (!match)
    return res.status(400).json({
      error: {
        message: "The username or password is incorrect.",
        code: "INVALID_CREDENTIALS",
      },
    });

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
  const filter = {
    userId: user._id,
  };

  const update = {
    refreshToken: refreshToken,
    status: true,
    expiresIn: Date.now() + 604800000,
    createdAt: Date.now(),
  };

  await Token.findOneAndUpdate(filter, update, {
    upsert: true,
    new: true,
  }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    result: "You login successfully",
    code: "SUCCESS",
    user,
    accessToken,
    refreshToken,
    type: "JWT",
  });
};

/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: Login
 *      requestBody:
 *        description: Email and password information to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You logged in successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
