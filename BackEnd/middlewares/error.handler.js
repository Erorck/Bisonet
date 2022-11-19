const logErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
};

//Handler for server error
const errorHandler = (err, req, res) => {
  console.log(res);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

//Handler for boom type errors
const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

module.exports = { logErrors, boomErrorHandler, errorHandler };
