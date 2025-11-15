import { body } from "express-validator";

export const createPublikasiValidator = [
  body("judul").notEmpty().withMessage("Judul wajib di isi").trim(),
  body("description").notEmpty().withMessage("Deskripsi wajib di isi").trim(),
  body("tanggal")
    .notEmpty()
    .withMessage("Tanggal wajib di isi")
    .isDate({ format: "YYYY-MM-DD" }) // untuk string form-data yyyy-mm-dd
    .withMessage("Tanggal tidak valid"),
  body("jenisDokumen")
    .notEmpty()
    .withMessage("Jenis dokumen wajib di isi")
    .isInt()
    .withMessage("Jenis dokumen harus angka")
    .toInt(),
];

export const updatePublikasiValidator = [
  body("judul").optional().notEmpty().withMessage("Judul tidak boleh kosong"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong"),
  body("tanggal")
    .optional()
    .notEmpty()
    .withMessage("Tanggal wajib di isi")
    .trim()
    .isISO8601()
    .withMessage("Tanggal tidak valid"),
  body("jenisDokumen")
    .optional()
    .notEmpty()
    .withMessage("Jenis dokumen wajib di isi")
    .toInt() // <-- konversi string ke integer
    .isInt()
    .withMessage("Jenis dokumen harus angka"),
];
