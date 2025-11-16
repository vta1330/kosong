import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const loginService = async (username, password) => {
  try {
    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Return admin data without password
    const { password: _, ...adminData } = admin;
    return adminData;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  // For session-based auth, logout is handled in controller by destroying session
  return { message: "Logged out successfully" };
};
