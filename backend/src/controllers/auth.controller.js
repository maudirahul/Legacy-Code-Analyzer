const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking for existing user
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    //save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //jwt token generation
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      message: "user created successfully",
      user: { id: user._id, name: user.name, email: user.email },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //finding the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    //compare the passoword
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "invalid credentials" });

    //jwt token generation
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

const forgotPassword = async (req, res) => {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no user with that email address." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your ArchLens account.</p>
      <p>Please click the link below to set a new password. This link is valid for 15 minutes.</p>
      <a href="${resetUrl}" target="_blank" style="background: #a855f7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "ArchLens - Password Reset Token",
      html: message,
    });

    res.status(200).json({ message: "Reset link sent to email!" });
  } catch (error) {
    // 2. Log the REAL error so we can read it!
    console.error("EMAIL SENDING ERROR:", error);

    // 3. Now this will work perfectly because 'user' is defined at the top
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }

    return res
      .status(500)
      .json({
        message: "There was an error sending the email. Try again later.",
      });
  }
};

const resetPassword = async (req, res) => {
  try {
    // 1. Hash the token the user sent in the URL so it matches the DB
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 2. Find a user with this token, IF the token hasn't expired yet
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // 3. Hash the new password and save it
    user.password = await bcrypt.hash(req.body.password, 10);

    // 4. Clear the temporary token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
