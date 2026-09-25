export function errorHandler(error, _request, response, _next) {
  console.error(error);

  const statusCode = error.statusCode || (error.code === "LIMIT_FILE_SIZE" ? 413 : 500);
  const message = error.expose
    ? error.message
    : statusCode === 413
      ? "File is too large. Maximum size is 5 MB."
      : "Something went wrong on the server.";

  return response.status(statusCode).json({ message });
}
