import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import router from "./routes/routes.js";
import path from "path";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use("/uploads", express.static(path.resolve("uploads")));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
const oneDay = 1000 * 60 * 60 * 24; // Session 24 jam
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: oneDay,
      httpOnly: true,
    },
  })
);

// Routes
app.use("/api", router);
app.use(errorHandler);

export default app;
