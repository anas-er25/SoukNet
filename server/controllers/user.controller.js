import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

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
    })

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
    
    const upload = await uploadImageCloudinary(avatar)
    const updateUser = await UserModel.findByIdAndUpdate(userId,{
      avatar: upload.url
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
}