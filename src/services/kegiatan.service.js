import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";

export const createKegiatan = async (payload) => {
  const { judul, description, tanggal, kategori, image } = payload;

  const dateObj = new Date(tanggal);
  if (isNaN(dateObj)) throw new AppError("Tanggal tidak valid", 400);

  const exist = await prisma.kegiatan.findUnique({ where: { judul } });
  if (exist) throw new AppError("Judul kegiatan sudah digunakan", 409);

  return prisma.kegiatan.create({
    data: { judul, description, tanggal, kategori, image },
  });
};

export const listKegiatan = async () => {
  return prisma.kegiatan.findMany();
};

export const getKegiatanById = async (id) => {
  const data = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });

  if (!data) throw new AppError("Kegiatan tidak ditemukan", 404);

  return data;
};

export const updateKegiatan = async (payload, id) => {
  const { judul, description, tanggal, kategori, image } = payload;

  const existing = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) throw new AppError("Kegiatan tidak ditemukan", 404);

  // Hapus gambar lama jika ada gambar baru
  if (image && existing.image) {
    deleteFile(`uploads/foto/${existing.image}`);
  }

  return prisma.kegiatan.update({
    where: { id: Number(id) },
    data: {
      judul,
      description,
      tanggal,
      kategori,
      image: image || existing.image,
    },
  });
};

export const deleteKegiatan = async (id) => {
  const existing = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) throw new AppError("Kegiatan tidak ditemukan", 404);

  if (existing.image) {
    deleteFile(`uploads/foto/${existing.image}`);
  }

  return prisma.kegiatan.delete({
    where: { id: Number(id) },
  });
};
