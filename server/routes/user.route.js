import { Router } from "express";
import {
  loginController,
  logoutController,
  registerUserController,
  updateUserDetailsController,
  uploadAvatar,
  verifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordOtpController,
  resetPasswordController,
  refreshTokenController,
  userDetails,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth,upload.single('avatar'), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetailsController);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp",verifyForgotPasswordOtpController);
userRouter.put("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.get("/user-details", auth, userDetails);

export default userRouter;
