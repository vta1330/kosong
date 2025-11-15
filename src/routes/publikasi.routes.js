import express from "express";
import {
  createPublikasi,
  listPublikasi,
  getPublikasiById,
  updatePublikasi,
  deletePublikasi,
} from "../controllers/publikasi.controller.js";

import { uploadDokumen } from "../middleware/dokumen.js"; // multer
import {
  createPublikasiValidator,
  updatePublikasiValidator,
} from "../validators/publikasi.validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// VALIDASI dulu → baru upload
router.post(
  "/",
  uploadDokumen.single("dokumen"),
  createPublikasiValidator,
  validate("uploads/dokumen"),
  createPublikasi
);

router.patch(
  "/:id",
  uploadDokumen.single("dokumen"),
  updatePublikasiValidator,
  validate("uploads/dokumen"),
  updatePublikasi
);

router.get("/", listPublikasi);
router.get("/:id", getPublikasiById);
router.delete("/:id", deletePublikasi);

export default router;
