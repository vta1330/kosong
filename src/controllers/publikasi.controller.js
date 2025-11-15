import * as Services from "../services/publikasi.service.js";

export const createPublikasi = async (req, res, next) => {
  try {
    const data = await Services.createPublikasi(req.body);

    res.json({
      status: "success",
      message: "Publikasi berhasil di buat",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const listPublikasi = async (_req, res, next) => {
  try {
    const data = await Services.listPublikasi();

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getPublikasiById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Services.getPublikasiById(id);

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePublikasi = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const data = await Services.updatePublikasi(payload, id);

    res.json({
      status: "success",
      message: "Publikasi berhasil di perbarui",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePublikasi = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Services.deletePublikasi(id);

    res.json({
      status: "success",
      message: "Publikasi berhasil di hapus",
      data,
    });
  } catch (err) {
    next(err);
  }
};
