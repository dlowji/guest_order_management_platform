import { Router } from "express";
import UserController from "../controllers/user/index.js";
import { auth } from "../middlewares/index.js";
const router = Router();

// AUTH
router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);
// router.post('/logout', auth, logout);
// router.post('/verify-email', verifyEmail);
// router.post('/refresh-token', refreshToken);
// router.post('/forgot-password', auth, forgotPassword);
// router.post('/send-verification-code', sendVerificationCode);

// // EDIT
// router.post('/change-password', auth, changePassword);
// router.put('/', auth, imageUpload, editUser);

router.get("/me", auth, UserController.getUser);
// router.delete('/', auth, deleteUser);

export default router;
