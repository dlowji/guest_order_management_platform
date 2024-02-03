import Joi from "joi";

export function validateRegister(body) {
  const allowedRoles = ["Admin", "Chef", "Employee"];
  const allowedGender = ["Female", "Male", "Other"];
  const phonePattern = new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})");
  const schema = Joi.object({
    username: Joi.string().required().min(8).max(32).trim().messages({
      "any.required": "Please enter username",
      "string.empty": "Please enter a valid username",
      "string.min": "Username must be at least 8 characters long",
      "string.max": "Username must not exceed 32 characters",
    }),
    password: Joi.string().required().min(8).max(32).trim().messages({
      "any.required": "Please enter password",
      "string.empty": "Please enter a valid password",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 32 characters",
    }),
    fullName: Joi.string().required().min(1).trim().messages({
      "any.required": "Please enter your full name",
      "string.empty": "Please enter a valid name",
      "string.min": "Your full name must be at least 1 characters long",
    }),
    email: Joi.string().email().min(3).trim().required().messages({
      "any.required": "Please enter your email address",
      "string.empty": "Please enter a valid email address",
      "string.email": "Please enter a valid email address",
    }),
    gender: Joi.string()
      .required()
      .valid(...allowedGender)
      .messages({
        "any.required": "Please enter your gender",
        "string.empty": "Please enter a valid gender",
        "any.only": "Gender includes of: 'Male', 'Female', 'Other'",
      }),
    salary: Joi.number().required().min(1000).messages({
      "any.required": "Please enter your salary",
      "number.base": "Please enter a valid number",
      "number.min": "Salary must be at least 1000",
    }),
    birthDate: Joi.date().required().iso().messages({
      "any.required": "Please enter your birth date",
      "date.iso": "Please enter a valid date",
    }),
    phone: Joi.string().required().pattern(phonePattern).messages({
      "string.empty": "Please enter a valid phone number",
      "any.required": "Please enter your phone number",
      "string.pattern.base": "Please enter a valid phone number",
    }),
    address: Joi.string().required().messages({
      "any.required": "Please enter your address",
      "string.empty": "Please enter a valid address",
    }),
    roleName: Joi.string()
      .required()
      .valid(...allowedRoles)
      .messages({
        "any.required": "Please enter the role id",
        "string.empty": "Please enter a valid role id",
        "any.only": "Role includes of: 'Admin', 'Chef', 'Employee'",
      }),
  });
  return schema.validate(body);
}

export function validateLogin(body) {
  const schema = Joi.object({
    username: Joi.string().required().min(8).max(32).trim().messages({
      "any.required": "Please enter username",
      "string.empty": "Please enter a valid username",
      "string.min": "Username must be at least 8 characters long",
      "string.max": "Username must not exceed 32 characters",
    }),
    password: Joi.string().required().min(8).max(32).trim().messages({
      "any.required": "Please enter password",
      "string.empty": "Please enter a valid password",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must not exceed 32 characters",
    }),
  });
  return schema.validate(body);
}

export function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
  });
  return schema.validate(body);
}

export function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required(),
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required(),
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

export function validateEditUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    username: Joi.string().min(3).max(15),
    language: Joi.string().valid("tr", "en"),
    gender: Joi.string().valid("male", "female", "other"),
    birthDate: Joi.date(),
  });
  return schema.validate(body);
}
