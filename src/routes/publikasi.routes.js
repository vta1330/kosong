import { Router } from "express";
import {
  createPublikasi,
  deletePublikasi,
  getPublikasiById,
  listPublikasi,
  updatePublikasi,
} from "../controllers/publikasi.controller.js";

const router = Router();

router.post("/", createPublikasi);
router.get("/", listPublikasi);
router.get("/:id", getPublikasiById);
router.patch("/:id", updatePublikasi);
router.delete("/:id", deletePublikasi);

export default router;
