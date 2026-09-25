import multer from "multer";
import path from "node:path";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedExtensions = new Set([
  ".txt",
  ".log",
  ".json",
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
]);

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.has(extension)) {
      return callback(new Error("Unsupported file type."));
    }
    return callback(null, true);
  },
});
