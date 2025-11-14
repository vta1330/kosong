import * as services from "./service.js";

/**
 * Create
 */
export const createProgramKerja = async (req, res, next) => {
  try {
    const program = await services.createProgramKerja(req.body);

    res.json({
      status: "success",
      program,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get All (list)
 */
export const listProgramKerja = async (_req, res, next) => {
  try {
    const program = await services.listProgramKerja();

    res.json({
      status: "success",
      program,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get By Id
 */
export const getProgramKerjaById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await services.getProgramKerjaById(id);

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update
 */
export const updateProgramKerja = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const data = await services.updateProgramKerja(payload, id);

    res.json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProgramKerja = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await services.deleteProgramKerja(id);

    res.json({
      status: "success",
      message: "Program kerja berhasil dihapus",
      data,
    });
  } catch (err) {
    next(err);
  }
};
