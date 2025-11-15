import * as Services from "../services/jenisDokumen.service.js";

export const createJenisDokumen = async (req, res, next) => {
  try {
    const data = await Services.createJenisDokumen(req.body);

    res.json({
      status: "success",
      message: "Jenis dokumen berhasil di buat",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const listJenisDokumen = async (_req, res, next) => {
  try {
    const data = await Services.listJenisDokumen();

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateJenisDokumen = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const data = await Services.updateJenisDokumen(payload, id);

    res.json({
      status: "success",
      message: "Jenis Dokumen berhasil di perbarui",
      data,
    });
  } catch (err) {
    next(err);
  }
};
