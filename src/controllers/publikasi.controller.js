import * as Services from "../services/publikasi.service.js";
import { BASE_URL } from "../config/app.js";
import { deleteFile } from "../utils/deleteFile.js";

const formatFileUrl = (data) => {
  if (!data.dokumen) return data;
  return {
    ...data,
    dokumenUrl: `${BASE_URL}/uploads/dokumen/${data.dokumen}`,
  };
};

export const createPublikasi = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      dokumen: req.file ? req.file.filename : null,
    };

    const data = await Services.createPublikasi(payload);

    res.json({
      status: "success",
      message: "Publikasi berhasil dibuat",
      data: formatFileUrl(data),
    });
  } catch (err) {
    if (req.file) deleteFile(`uploads/dokumen/${req.file.filename}`);
    next(err);
  }
};

export const listPublikasi = async (_req, res, next) => {
  try {
    let data = await Services.listPublikasi();
    data = data.map(formatFileUrl);

    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

export const getPublikasiById = async (req, res, next) => {
  try {
    let data = await Services.getPublikasiById(req.params.id);
    data = formatFileUrl(data);

    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

export const updatePublikasi = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      dokumen: req.file ? req.file.filename : null,
    };

    const data = await Services.updatePublikasi(payload, req.params.id);

    res.json({
      status: "success",
      message: "Publikasi berhasil diperbarui",
      data: formatFileUrl(data),
    });
  } catch (err) {
    if (req.file) deleteFile(`uploads/dokumen/${req.file.filename}`);
    next(err);
  }
};

export const deletePublikasi = async (req, res, next) => {
  try {
    await Services.deletePublikasi(req.params.id);
    res.json({ status: "success", message: "Publikasi berhasil dihapus" });
  } catch (err) {
    next(err);
  }
};
