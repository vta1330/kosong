import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const createPublikasi = async (payload) => {
  const { judul, deskripsi, tanggal, dokumenUrl, jenisDokumenId } = payload;

  const exisingJenisDokumen = await prisma.jenisDokumen.findUnique({
    where: { id: Number(jenisDokumenId) },
  });

  if (!exisingJenisDokumen) {
    throw new AppError("Jenis dokumen tidak ada", 404);
  }

  const data = await prisma.publikasi.create({
    data: {
      judul,
      deskripsi,
      tanggal,
      dokumenUrl,
      jenisDokumenId: Number(jenisDokumenId),
    },
    include: {
      jenis: true,
    },
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

export const updatePublikasi = async (payload, id) => {
  const { judul, deskripsi, tanggal, dokumenUrl, jenisDokumenId } = payload;

  const exisingPublikasi = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
    include: {
      jenis: true,
    },
  });

  if (!exisingPublikasi) {
    throw new AppError("Publikasi tidak ada", 404);
  }

  if (jenisDokumenId) {
    const exisingJenisDokumen = await prisma.jenisDokumen.findUnique({
      where: { id: Number(jenisDokumenId) },
    });

    if (!exisingJenisDokumen) {
      throw new AppError("Jenis dokumen tidak ada", 404);
    }
  }

  const data = await prisma.publikasi.update({
    where: { id: Number(id) },
    data: {
      judul,
      deskripsi,
      tanggal,
      dokumenUrl,
      jenisDokumenId: Number(jenisDokumenId),
    },
    include: {
      jenis: true,
    },
  });

  return data;
};

export const deletePublikasi = async (id) => {
  const exisingPublikasi = await prisma.publikasi.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingPublikasi) {
    throw new AppError("Publikasi tidak ada", 404);
  }

  const data = await prisma.publikasi.delete({
    where: { id: Number(id) },
  });

  return data;
};
