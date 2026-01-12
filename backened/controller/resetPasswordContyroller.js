

import bcrypt from "bcryptjs";
import crypto from "crypto";
import userModel from "../models/userModel.js";
import sendEmail from "../nodemailer/nodeMailer.js";

// POST /api/users/forgot-password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  console.log(user);

  // Prevent email enumeration
  if (!user) {
    return res.status(200).json({
      message: "If account exists, reset link sent"
    });
  };


  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:6000/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    text: `Reset your password using this link:\n\n${resetUrl}\n\nThis link expires in 15 minutes.`
  });

  res.status(200).json({
    message: "If account exists, reset link sent"
  });
};



// POST /api/users/reset-password/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired token"
    });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    message: "Password reset successful"
  });
};
