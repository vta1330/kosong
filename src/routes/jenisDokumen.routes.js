import { Router } from "express";
import {
  createJenisDokumen,
  listJenisDokumen,
  updateJenisDokumen,
} from "../controllers/jenisDokumen.controller.js";

const router = Router();

router.post("/", createJenisDokumen);
router.get("/", listJenisDokumen);
router.patch("/:id", updateJenisDokumen);

export default router;
