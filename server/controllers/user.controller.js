import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Register User
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "L'adresse email existe déjà",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);
    const payload = {
      name,
      email,
      password: hashPass,
    };
    const newUser = new UserModel(payload);
    const saving = await newUser.save();
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${saving?._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Vérifier votre email",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      error: false,
      success: true,
      data: saving,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Verify Email
export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.query;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.status(200).json({
      message: "Votre email a été vérifié avec succès",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: `Votre compte est ${user.status}`,
        error: true,
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Mot de passe incorrect",
        error: true,
        success: false,
      });
    }
    const accesstoken = await generatedAccessToken(user._id);
    const refreshtoken = await generatedRefreshToken(user._id);
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);
    return res.status(200).json({
      message: "Connexion réussie",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// logout

export const logoutController = async (req, res) => {
  try {
    const userid = req.userId; // from the middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Déconnexion réussie",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const avatar = req.file; // multer middleware

    const upload = await uploadImageCloudinary(avatar);
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    return res.status(200).json({
      message: "Avatar uploadé avec succès",
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update user details

export const updateUserDetailsController = async (req, res) => {
  try {
    const userId = req.userId; // auth middleware
    const { name, email, mobile, password } = req.body;

    let hashPass = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPass = await bcryptjs.hash(password, salt);
    }
    const userUpdate = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPass }),
      }
    );
    const userUpdated = await UserModel.findById(userId);
    return res.status(200).json({
      message: "Détails modifiés avec succès",
      error: false,
      success: true,
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// forgot password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }

    const OTP = generateOtp();
    const expireTime = new Date() + 60 * 60 * 1000; //1 hr
    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: OTP,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    const sendEmailReset = await sendEmail({
      sendTo: email,
      subject: "Réinitialiser votre mot de passe",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: OTP,
      }),
    });
    return res.status(200).json({
      message: "Email de réinitialisation envoyé avec succès",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// verify forgot password otp

export const verifyForgotPasswordOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }
    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(401).json({
        message: "Le code d'activation a expiré",
        error: true,
        success: false,
      });
    }
    if (user.forgot_password_otp !== otp) {
      return res.status(401).json({
        message: "Code d'activation incorrect",
        error: true,
        success: false,
        data: user.forgot_password_otp,
      });
    }

    // if (user.forgot_password_otp === otp) {
    //   const updateUser = await UserModel.findByIdAndUpdate(user._id, {
    //     forgot_password_otp: "",
    //     forgot_password_expiry: "",
    //   });
    // }

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.status(200).json({
      message: "Code d'activation confirmé",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// reset password

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Veuillez fournir tous les champs obligatoires",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        message: "Les mots de passe ne correspondent pas",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });
    return res.status(200).json({
      message: "Mot de passe réinitialisé avec succès",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// refresh token

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Token invalide",
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token expiré",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Utilisateur non trouvé",
        error: true,
        success: false,
      });
    }
    const newAccessToken = await generatedAccessToken(userId);
    console.log("newAccessToken:" + newAccessToken);

    const accesstokenOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", newAccessToken, accesstokenOptions);

    return res.status(200).json({
      message: "Token mis à jour",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get login user details
export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );
    return res.status(200).json({
      message: "Détails de l'utilisateur",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Quelque chose ne va pas",
      error: true,
      success: false,
    });
  }
};
