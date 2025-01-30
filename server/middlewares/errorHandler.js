export const errorHandler = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  return res
    .status(err.statusCode)
    .json({ sucess: false, message: err.message });
};
