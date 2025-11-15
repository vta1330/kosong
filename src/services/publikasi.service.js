import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";

export const createPublikasi = async (payload) => {
  const { judul, description, tanggal, jenisDokumen, dokumen } = payload;

  const existing = await prisma.publikasi.findUnique({ where: { judul } });
  if (existing) throw new AppError("Judul publikasi sudah digunakan", 409);

  return prisma.publikasi.create({
    data: { judul, description, tanggal, jenisDokumen, dokumen },
  });
};

export const listPublikasi = async () => {
  return prisma.publikasi.findMany({
    include: { jenis: true },
  });
};

export const getPublikasiById = async (id) => {
  const data = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
    include: { jenis: true },
  });

  if (!data) throw new AppError("Publikasi tidak di temukan", 404);
  return data;
};

export const updatePublikasi = async (payload, id) => {
  const existing = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) throw new AppError("Publikasi tidak ditemukan", 404);

  // Jika ada dokumen baru → hapus yang lama
  if (payload.dokumen && existing.dokumen) {
    deleteFile(`uploads/dokumen/${existing.dokumen}`);
  }

  return prisma.publikasi.update({
    where: { id: Number(id) },
    data: {
      ...payload,
      dokumen: payload.dokumen ? payload.dokumen : existing.dokumen,
    },
  });
};

export const deletePublikasi = async (id) => {
  const existing = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
  });

  if (!existing) throw new AppError("Publikasi tidak ditemukan", 404);

  if (existing.dokumen) {
    deleteFile(`uploads/dokumen/${existing.dokumen}`);
  }

  return prisma.publikasi.delete({ where: { id: Number(id) } });
};
