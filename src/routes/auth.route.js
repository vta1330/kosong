import express from "express";
import { login, logout, getMe } from "../controllers/auth.controller.js";
import { loginValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginValidator, validate, login);

// POST /api/auth/logout - requires authentication
router.post("/logout", protect, logout);

// GET /api/auth/me - requires authentication
router.get("/me", protect, getMe);

export default router;
