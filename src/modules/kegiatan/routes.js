import express from "express";
import {
  createKegiatan,
  deleteKegiatan,
  getKegiatanById,
  listKegiatan,
  updateKegiatan,
} from "./controller.js";

const router = express.Router();

router.post("/", createKegiatan);
router.get("/", listKegiatan);
router.get("/:id", getKegiatanById);
router.patch("/:id", updateKegiatan);
router.delete("/:id", deleteKegiatan);

export default router;
