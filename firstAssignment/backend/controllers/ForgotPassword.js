const User = require("../models/User");
const ForgotPasswordRequest = require("../models/ForgotPasswordRequest");
const { sendResetEmail } = require("../services/emailService");

exports.handleForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log("email for which the password is requested", email);
  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there is already an active request for the user
    const existingRequest = await ForgotPasswordRequest.findOne({
      userId: user._id,
      isactive: true,
    });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "There is already an active password reset request for this user.",
      });
    }

    // Create a new forgot password request
    const forgotPasswordRequest = new ForgotPasswordRequest({
      userId: user._id,
      isactive: true,
    });

    await forgotPasswordRequest.save();

    // Build the reset link
    const resetLink = `http://localhost:3000/api/user/password/resetpassword/${forgotPasswordRequest._id}`;

    // Send the reset email
    const sender = {
      email: "abhishek.career1993@gmail.com",
      name: "Sharpener-Abhi",
    };

    const receivers = [{ email: email }];

    const subject = "Password Reset";
    const textContent = `Click the link below to reset your password: ${resetLink}`;
    const htmlContent = `<h1>Password Reset</h1><p>Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`;

    await sendResetEmail(sender, receivers, subject, textContent, htmlContent);

    res.status(200).json({
      message:
        "Password reset email sent successfully, check your email please",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.handleresetPassword = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;

    // Check if the request exists and is active
    const resetRequest = await ForgotPasswordRequest.findOne({
      _id: requestId,
      isactive: true,
    });

    if (!resetRequest) {
      return res.status(404).json({ message: "Invalid or expired reset link" });
    }

    res.send(`
      <form action="http://localhost:3000/api/user/password/updatepassword/${requestId}" method="POST">
        <label for="password">Enter a new password:</label>
        <input type="password" name="password" required>
        <button type="submit">Update Password</button>
      </form>
    `);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    const newPassword = req.body.password;

    // Check if the request exists and is active
    const resetRequest = await ForgotPasswordRequest.findOne({
      _id: requestId,
      isactive: true,
    });

    if (!resetRequest) {
      return res.status(404).json({ message: "Invalid or expired reset link" });
    }

    // Update the user's password
    const user = await User.findById(resetRequest.userId);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Deactivate the reset request
    resetRequest.isactive = false;
    await resetRequest.save();

    return res.status(200).send("<h1>Password updated successfully</h1>");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
