import { loginService, logoutService } from "../services/auth.service.js";
import { validationResult } from "express-validator";

export const login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Authenticate user
    const admin = await loginService(username, password);

    // Store admin in session
    req.session.admin = admin;

    res.status(200).json({
      message: "Login successful",
      admin,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid"); // Clear session cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // Return current admin from session
    res.status(200).json({
      admin: req.session.admin,
    });
  } catch (error) {
    next(error);
  }
};
