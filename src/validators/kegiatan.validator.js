import { body } from "express-validator";
import AppError from "../utils/AppError.js";

export const createKegiatanValidator = [
  body("judul")
    .notEmpty()
    .withMessage("Judul wajib diisi")
    .isString()
    .withMessage("Judul harus berupa teks")
    .isLength({ min: 3 })
    .withMessage("Judul minimal 3 karakter"),

  body("description").notEmpty().withMessage("Deskripsi wajib diisi"),

  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal wajib diisi")
    .isISO8601()
    .withMessage("Format tanggal tidak valid (gunakan YYYY-MM-DD)"),

  body("kategori")
    .notEmpty()
    .withMessage("Kategori wajib diisi")
    .isString()
    .withMessage("Kategori harus berupa teks"),
];

export const updateKegiatanValidator = [
  body("judul")
    .optional()
    .isString()
    .withMessage("Judul harus berupa teks")
    .isLength({ min: 3 })
    .withMessage("Judul minimal 3 karakter"),

  body("description").optional(),

  body("tanggal")
    .optional()
    .isISO8601()
    .withMessage("Format tanggal tidak valid (YYYY-MM-DD)"),

  body("kategori")
    .optional()
    .isString()
    .withMessage("Kategori harus berupa teks"),
];
