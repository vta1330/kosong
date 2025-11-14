import express from "express";
import programKerja from "../modules/program-kerja/routes.js";

const router = express.Router();

router.use("/program-kerja", programKerja);

export default router;
