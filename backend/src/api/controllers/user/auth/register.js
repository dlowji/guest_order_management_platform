import { User, Role, Employee } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

export const register = async (req, res) => {
  //validate request body
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
        field: error.details[0].path[0],
        code: "INVALID_FORMAT",
      },
    });
  }

  const {
    username,
    password,
    fullName,
    email,
    gender,
    salary,
    birthDate,
    phone,
    address,
    roleName,
  } = req.body;

  //check if username exists
  const existUsername = await User.exists({ username }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (existUsername)
    return res.status(409).json({
      error: {
        message: "The username is already taken.",
        code: "FIELD_ALREADY_EXISTS",
      },
    });

  //check if email exists
  const existEmail = await User.exists({ email }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (existEmail)
    return res.status(409).json({
      error: {
        message: "The email is already taken.",
        code: "FIELD_ALREADY_EXISTS",
      },
    });

  //check if role exists
  const existRole = await Role.exists({ name: roleName }).catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  if (!existRole) return res.status(404).json({
    error: {
      message: "The role does not exist.",
      code: "NOT_FOUND",
    },
  });

  //hash password
  const hashedPassword = await hash(password, 10);
  const role = await Role.findOne({ name: roleName });

  let employee = new Employee({
    fullName,
    email,
    salary,
    phone,
    address,
    gender,
    birthDate,
    role: role._id,
  });

  employee = await employee.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  let user = new User({
    username,
    password: hashedPassword,
    employee: employee._id,
  });

  user = await user.save().catch((err) => {
    return res.status(500).json({
      error: {
        message: "An internal server error occurred, please try again.",
        code: "INTERNAL_SERVER_ERROR",
        reason: err.message,
      },
    });
  });

  return res.status(200).json({
    message: "You registered successfully.",
    code: "SUCCESS",
    data: {
      username: user.username,
      employee: {
        fullName: employee.fullName,
        email: employee.email,
        salary: employee.salary,
        phone: employee.phone,
        address: employee.address,
        gender: employee.gender,
        birthDate: employee.birthDate.getDate(),
        roleName: role.name,
      }
    },
  });
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: All required information about the user
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
 *                name:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']
 *                platform:
 *                  type: string
 *                  enum: ['Android', 'IOS']
 *                timezone:
 *                  type: number
 *                deviceId:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You registered successfully.
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
 *                          confirmToken:
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
