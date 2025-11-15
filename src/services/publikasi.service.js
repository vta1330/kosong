import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const createPublikasi = async (payload) => {
  const { judul, description, tanggal, jenisDokumen, image } = payload;

  const exisingJudul = await prisma.publikasi.findUnique({
    where: { judul },
  });

  if (exisingJudul) {
    throw new AppError("Judul publikasi sudah di gunakan", 409);
  }

  const data = await prisma.publikasi.create({
    data: { judul, description, tanggal, jenisDokumen, image },
  });

  return data;
};

export const listPublikasi = async () => {
  const data = await prisma.publikasi.findMany({
    include: {
      jenis: true,
    },
  });
  return data;
};

export const getPublikasiById = async (id) => {
  const data = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
    include: {
      jenis: true,
    },
  });

  if (!data) {
    throw new AppError("Publikasi tidak di temukan");
  }

  return data;
};

export const updatePublikasi = async (payload, id) => {
  const { judul, description, tanggal, jenisDokumen, image } = payload;

  const exisingPublikasi = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingPublikasi) {
    throw new AppError("Publikasi tidak di temukan", 404);
  }

  if (judul) {
    const duplicate = await prisma.publikasi.findUnique({
      where: { judul },
    });

    if (duplicate && duplicate.id !== Number(id)) {
      throw new AppError("Judul publikasi sudah di gunakan", 409);
    }
  }

  const data = await prisma.publikasi.update({
    where: { id: Number(id) },
    data: { judul, description, tanggal, jenisDokumen, image },
  });

  return data;
};

export const deletePublikasi = async (id) => {
  const exisingPublikasi = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingPublikasi) {
    throw new AppError("Publikasi tidak di temukan", 404);
  }

  const data = await prisma.publikasi.delete({
    where: { id: Number(id) },
  });

  return data;
};
