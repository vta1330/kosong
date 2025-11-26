import { Router } from "express";
import {
  createJenisDokumen,
  deleteJenisDokumen,
  listJenisDokumen,
  updateJenisDokumen,
} from "../controllers/jenisDokumen.controller.js";

const router = Router();

router.post("/", createJenisDokumen);
router.get("/", listJenisDokumen);
router.patch("/:id", updateJenisDokumen);
router.delete("/:id", deleteJenisDokumen);

export default router;
