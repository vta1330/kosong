import { Router } from "express";
import {} from "../controllers/publikasi.controller.js";

const router = Router();

router.post("/", createProgramKerja);
router.get("/", listProgramKerja);
router.get("/:id", getProgramKerjaById);
router.patch("/:id", updateProgramKerja);
router.delete("/:id", deleteProgramKerja);

export default router;
