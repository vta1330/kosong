import multer from "multer";
import path from "path";
import fs from "fs";

// Folder upload
const uploadDir = "uploads/foto";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

// Filter file
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("File harus berupa gambar (jpg/png)"));
  }

  cb(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

export const uploadFoto = multer({ storage, fileFilter, limits });
