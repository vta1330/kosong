import { Router } from "express";
import {
  createProgramKerja,
  deleteProgramKerja,
  getProgramKerjaById,
  listProgramKerja,
  updateProgramKerja,
} from "../controllers/programKerja.controller.js";

const router = Router();

router.post("/", createProgramKerja);
router.get("/", listProgramKerja);
router.get("/:id", getProgramKerjaById);
router.patch("/:id", updateProgramKerja);
router.delete("/:id", deleteProgramKerja);

export default router;
