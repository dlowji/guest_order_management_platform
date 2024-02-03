// AUTH
import { register } from "./auth/register.js";
import { login } from "./auth/login.js";
import { logout } from "./auth/logout.js";
import { verifyEmail } from "./auth/verify-email.js";
import { refreshToken } from "./auth/refresh-token.js";
import { forgotPassword } from "./auth/forgot-password.js";
import { sendVerificationCode } from "./auth/send-verification-code.js";

// EDIT
import { changePassword } from "./edit/change-password.js";
import { editUser } from "./edit/edit-user.js";

// OTHER
import { getUser } from "./get-user.js";
import { deleteUser } from "./delete-user.js";

const UserController = {
  register,
  login,
  logout,
  verifyEmail,
  refreshToken,
  forgotPassword,
  sendVerificationCode,
  changePassword,
  editUser,
  getUser,
  deleteUser,
};

export default UserController;
