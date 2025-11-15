import prisma from "../../config/prisma.js";
import AppError from "../../utils/AppError.js";

export const createKegiatan = async (paylaod) => {
  const { judul, description, tanggal, kategori, image } = paylaod;

  const dateObj = new Date(tanggal);

  if (isNaN(dateObj)) {
    throw new AppError("Tanggal tidak valid", 400);
  }

  const data = await prisma.kegiatan.create({
    data: { judul, description, tanggal, kategori, image },
  });

  return data;
};

export const listKegiatan = async () => {
  const data = await prisma.kegiatan.findMany();
  return data;
};

export const getKegiatanById = async (id) => {
  const data = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });

  if (!data) {
    throw new AppError("Kegiatan tidak di temukan", 404);
  }

  return data;
};

export const updateKegiatan = async (payload, id) => {
  const { judul, description, tanggal, kategori, image } = payload;

  const exisingKegiatan = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingKegiatan) {
    throw new AppError("Kegiatan tidak di temukan", 404);
  }

  if (judul) {
    const duplicate = await prisma.kegiatan.findUnique({
      where: { judul },
    });

    if (duplicate && duplicate.id !== Number.id) {
      throw new AppError("Judul kegiatan sudah di gunakan", 409);
    }
  }

  const data = await prisma.kegiatan.update({
    where: { id: Number(id) },
    data: { judul, description, tanggal, kategori, image },
  });

  return data;
};

export const deleteKegiatan = async (id) => {
  const exisingKegiatan = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingKegiatan) {
    throw new AppError("Kegiatan tidak di temukan", 404);
  }

  const data = await prisma.kegiatan.delete({
    where: { id: Number(id) },
  });

  return data;
};
