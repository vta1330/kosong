import * as Services from "../services/kegiatan.service.js";

export const createKegiatan = async (req, res, next) => {
  try {
    const data = await Services.createKegiatan(req.body);

    res.json({
      status: "success",
      message: "Kegiatan berhasil di buat",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const listKegiatan = async (_req, res, next) => {
  try {
    const data = await Services.listKegiatan();

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getKegiatanById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Services.getKegiatanById(id);

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateKegiatan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const data = await Services.updateKegiatan(payload, id);

    res.json({
      status: "success",
      message: "Kegiatan berhasil di perbarui",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteKegiatan = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Services.deleteKegiatan(id);

    res.json({
      status: "success",
      message: "Kegiatan berhasil di hapus",
      data,
    });
  } catch (err) {
    next(err);
  }
};
