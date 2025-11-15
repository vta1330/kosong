import express from "express";
import programKerja from "./programKerja.routes.js";
import kegiatan from "./kegiatan.routes.js";
import jenisDokumen from "./jenisDokumen.routes.js";
import publikasi from "./publikasi.routes.js";

const router = express.Router();

router.use("/program-kerja", programKerja);
router.use("/kegiatan", kegiatan);
router.use("/jenis-dokumen", jenisDokumen);
router.use("/publikasi", publikasi);

export default router;
