export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const SUPPORTED_EXTENSIONS = [
  ".txt",
  ".log",
  ".json",
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
];

export function getExtension(fileName = "") {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot).toLowerCase();
}

export function isImageFile(file) {
  return Boolean(file?.type?.startsWith("image/"));
}

export function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
