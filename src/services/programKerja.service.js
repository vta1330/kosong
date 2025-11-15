import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

/**
 * Create
 */
export const createProgramKerja = async (payload) => {
  const { judul, sub_judul, description } = payload;

  //   cek apakah sudah ada judul yang sama dengan program kerja sebelumnya
  const exisingJudul = await prisma.program_kerja.findUnique({
    where: { judul },
  });

  //   Jika judul sudah ada, maka tampilkan pesan dan code http
  if (exisingJudul) {
    throw new AppError("Program kerja sudah ada", 409);
  }

  //   Jika tidak ada, create.
  const data = await prisma.program_kerja.create({
    data: { judul, sub_judul, description },
  });

  return data;
};

/**
 * Get All (list)
 */
export const listProgramKerja = async () => {
  // Menampilkan seluruh data yang ada
  const data = await prisma.program_kerja.findMany();
  return data;
};

/**
 * Get By Id
 */
export const getProgramKerjaById = async (id) => {
  // Mencari program kerja berdasarkan Id
  const data = await prisma.program_kerja.findUnique({
    where: { id: Number(id) },
  });

  //   Jika program kerja tidak ditemukan lewat id, maka tampilkan pesan dan code http
  if (!data) {
    throw new AppError("Program kerja tidak ditemukan", 404);
  }

  return data;
};

/**
 * Update
 */
export const updateProgramKerja = async (payload, id) => {
  const { judul, sub_judul, description } = payload;

  // Cek apakah project program kerja ada jika dicari lewat Id
  const exisingProgram = await prisma.program_kerja.findUnique({
    where: { id: Number(id) },
  });

  //   Jika tidak ada, tampilkan pesan dan code http
  if (!exisingProgram) {
    throw new AppError("Program kerja tidak ditemukan", 404);
  }

  // Cek apakah judul sudah dipakai program lain
  if (judul) {
    const duplicate = await prisma.program_kerja.findUnique({
      where: { judul },
    });

    //   Jika sudah dipakai, tampilkan pesan dan code http
    if (duplicate && duplicate.id !== Number.id) {
      throw new AppError("Judul program kerja sudah digunakan", 409);
    }
  }

  //   Jika project program kerja ada, Update.
  const data = await prisma.program_kerja.update({
    where: { id: Number(id) },
    data: { judul, sub_judul, description },
  });

  return data;
};

/**
 * Delete
 */
export const deleteProgramKerja = async (id) => {
  // Cek apakah project program kerja ada jika dicari lewat Id
  const exisingProgram = await prisma.program_kerja.findUnique({
    where: { id: Number(id) },
  });

  //   Jika tidak ada, tampilkan pesan dan code http
  if (!exisingProgram) {
    throw new AppError("Program kerja tidak ditemukan", 404);
  }

  //   Jika project program kerja ada, Delete.
  const data = await prisma.program_kerja.delete({
    where: { id: Number(id) },
  });

  return data;
};
