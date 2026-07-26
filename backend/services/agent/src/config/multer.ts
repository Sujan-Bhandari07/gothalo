import multer, { type FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { type Request } from "express";

// Resolve uploads folder to project root and create it if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = ["image/", "application/pdf"];

  const isAllowed =
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf";

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

export default upload;