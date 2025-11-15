import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";

export const validate =
  (folder = null) =>
  (req, _res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // ⛔ Jika ada file ter-upload → hapus dari folder yang sesuai
      if (req.file && folder) {
        deleteFile(`${folder}/${req.file.filename}`);
      }

      const msg = errors
        .array()
        .map((e) => e.msg)
        .join(", ");
      return next(new AppError(msg, 400));
    }

    next();
  };
