import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const createJenisDokumen = async (payload) => {
  const { nama } = payload;

  const exisingNama = await prisma.jenisDokumen.findUnique({
    where: { nama },
  });

  if (exisingNama) {
    throw new AppError("Nama jenis dokumen sudah ada", 409);
  }

  const data = await prisma.jenisDokumen.create({
    data: { nama },
  });

  return data;
};

export const listJenisDokumen = async () => {
  const data = await prisma.jenisDokumen.findMany({
    include: {
      publikasi: true,
    },
  });
  return data;
};

export const updateJenisDokumen = async (payload, id) => {
  const { nama } = payload;

  const exisingJenisDokumen = await prisma.jenisDokumen.findUnique({
    where: { id: Number(id) },
    include: {
      publikasi: true,
    },
  });

  if (!exisingJenisDokumen) {
    throw new AppError("Jenis dokumen tidak ada", 404);
  }

  if (nama) {
    const duplicate = await prisma.jenisDokumen.findUnique({
      where: { nama },
    });

    if (duplicate && duplicate.id !== Number(id)) {
      throw new AppError("Nama jenis dokumen sudah di gunakan", 409);
    }
  }

  const data = await prisma.jenisDokumen.update({
    where: { id: Number(id) },
    data: { nama },
  });

  return data;
};

export const deleteJenisDokumen = async (id) => {
  const exisingJenisDokumen = await prisma.jenisDokumen.findUnique({
    where: { id: Number(id) },
  });

  if (!exisingJenisDokumen) {
    throw new AppError("Jenis dokumen tidak ada", 404);
  }

  const data = await prisma.jenisDokumen.delete({
    where: { id: Number(id) },
  });

  return data;
};
