import * as Services from "../services/kegiatan.service.js";
import { deleteFile } from "../utils/deleteFile.js";

const formatImageUrl = (data) => {
  if (!data.image) return data;
  return {
    ...data,
    imageUrl: `${BASE_URL}/uploads/foto/${data.image}`,
  };
};

export const createKegiatan = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      image: req.file?.filename || null,
    };

    const data = await Services.createKegiatan(payload);

    return res.json({
      status: "success",
      message: "Kegiatan berhasil dibuat",
      data: formatImageUrl(data),
    });
  } catch (err) {
    if (req.file) deleteFile(`uploads/foto/${req.file.filename}`);
    next(err);
  }
};

export const listKegiatan = async (_req, res, next) => {
  try {
    let data = await Services.listKegiatan();
    data = data.map(formatImageUrl);

    res.json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};

export const getKegiatanById = async (req, res, next) => {
  try {
    let data = await Services.getKegiatanById(req.params.id);
    res.json({ status: "success", data: formatImageUrl(data) });
  } catch (err) {
    next(err);
  }
};

export const updateKegiatan = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      image: req.file?.filename || null,
    };

    const updated = await Services.updateKegiatan(payload, req.params.id);

    res.json({
      status: "success",
      message: "Kegiatan berhasil diperbarui",
      data: formatImageUrl(updated),
    });
  } catch (err) {
    if (req.file) deleteFile(`uploads/foto/${req.file.filename}`);
    next(err);
  }
};

export const deleteKegiatan = async (req, res, next) => {
  try {
    const deleted = await Services.deleteKegiatan(req.params.id);

    res.json({
      status: "success",
      message: "Kegiatan berhasil dihapus",
    });
  } catch (err) {
    next(err);
  }
};
