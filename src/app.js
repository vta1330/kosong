import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);
app.use(errorHandler);

export default app;
