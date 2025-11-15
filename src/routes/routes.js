import express from "express";
import programKerja from "../modules/program-kerja/routes.js";
import kegiatan from "../modules/kegiatan/routes.js";

const router = express.Router();

router.use("/program-kerja", programKerja);
router.use("/kegiatan", kegiatan);

export default router;
