import express from "express";
import {
  createKegiatan,
  deleteKegiatan,
  getKegiatanById,
  listKegiatan,
  updateKegiatan,
} from "../controllers/kegiatan.controller.js";
import { uploadFoto } from "../middleware/foto.js";
import { validate } from "../middleware/validate.js";
import {
  createKegiatanValidator,
  updateKegiatanValidator,
} from "../validators/kegiatan.validator.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  uploadFoto.single("image"),
  createKegiatanValidator,
  validate("uploads/foto"),
  createKegiatan
);

// LIST
router.get("/", listKegiatan);

// DETAIL
router.get("/:id", getKegiatanById);

// UPDATE
router.patch(
  "/:id",
  uploadFoto.single("image"),
  updateKegiatanValidator,
  validate("uploads/foto"),
  updateKegiatan
);

// DELETE
router.delete("/:id", deleteKegiatan);

export default router;
